import { useState,useEffect } from "react"
import ClassRoom from "@/components/ClassRoom"
import EmptyClassroom from "./EmptyClassroom"
import TableSkeleton from "@/components/TableSkeleton"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { getFloor } from "./options"

const classroomList = ["一教","二教","三教","四教","理教","文史","哲学","地学","国关","政管"]
const timeList = ["今天","明天","后天"]

export default function RoomPage() {
  let [classroom, setClassroom] = useState("一教")
  let [classTime, setClassTime] = useState("今天")
  let [classInfo, setClassInfo] = useState({} as any)
  let [Loading, setLoading] = useState(true)
  let [isEmptyView, setIsEmptyView] = useState(true)

  async function fetchClassroom(classroom: string,classTime: string) {
    setLoading(true)
    const classInfo = await fetch('/api/classroom', {
      method: 'POST',
      body: JSON.stringify({
        classroom: classroom,
        time: classTime
      })
    }).then(res => res.json())
    setLoading(false)
    return classInfo
  }

  // directly call api from client side, CORS issue
  // async function fetchClassroom(classroom: string,classTime: string) {
  //   setLoading(true)
  //   const reqForm = new FormData();
  //   reqForm.append('buildingName', classroom);
  //   reqForm.append('time', classTime);
  //   const classInfo = await fetch('https://portal.pku.edu.cn/portal2017/publicsearch/classroom/retrClassRoomFree.do',{
  //     method: 'POST',
  //     headers: {
  //       'Origin': 'https://portal.pku.edu.cn',
  //       'Sec-Fetch-Site': 'same-origin',
  //       'Sec-Fetch-Mode': 'cors',
  //       'Sec-Fetch-Dest': 'empty',
  //       'Referer': 'https://portal.pku.edu.cn/portal2017/',
  //       'Access-Control-Allow-Origin': '*',
  //     },
  //     body: reqForm,
  //   }).then(res => res.json())
  //   setLoading(false)
  //   return classInfo
  // }

  useEffect(() => {
    if (isEmptyView && classTime !== "今天") {
      setClassTime("今天")
    }
  }, [isEmptyView])
  useEffect(() => {
    fetchClassroom(classroom,classTime).then(res => setClassInfo(res))
  }, [classroom,classTime])

  function AllClassroom() {
    return (
      <>
        <div className="grid grid-cols-3 px-4">
          {timeList.map((item, index) => (
            <button key={index} className={`px-4 py-2 rounded-none ${classTime === item ? "bg-sky-300/60 dark:bg-sky-800/40 text-slaye-900 dark:text-white" : " bg-slate-200 dark:bg-slate-700/40 text-slate-600 dark:text-slate-400"}`} onClick={() => setClassTime(item)}>{item}</button>
          ))}
        </div>
        {!Loading ? <ClassRoom classInfo={classInfo} classroom={classroom} classtime={classTime} /> : <TableSkeleton />}
      </>
    )
  }

  return (
    <>
      <div className="grid grid-cols-4 px-4">
        {classroomList.map((item, index) => (
          <button key={index} className={`px-4 py-2 rounded-none ${classroom === item ? "bg-sky-300/60 dark:bg-sky-800/40 text-slaye-900 dark:text-white" : " bg-slate-200 dark:bg-slate-700/40 text-slate-600 dark:text-slate-400"}`} onClick={() => setClassroom(item)}>{item}</button>
        ))}
      </div>
      <div className="flex flex-row space-x-2 justify-center items-center mx-10">
        <Switch className="border border-slate-200 dark:border-slate-600" checked={isEmptyView} onCheckedChange={()=>{setIsEmptyView(!isEmptyView)}} />
        <Label className="ml-2 shrink-0">仅空闲教室</Label>
      </div>
      {isEmptyView === false ? <AllClassroom /> : (!Loading ? <EmptyClassroom classroom={classInfo.rows} floor={getFloor(classroom)} loading={false}/> : <EmptyClassroom classroom={classInfo.rows} floor={getFloor(classroom)} loading/>)}
    </>
  )
}