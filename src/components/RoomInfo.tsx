import { useEffect,useState } from "react";
export default function RoomInfo({classroom,name,time,index}:{classroom: string,name: string,time: string,index: number}) {
  // fetch course info from /api/class
  let week = 0
  if (time=="今天") {
    week = new Date().getDay()
  }
  if (time=="明天") {
    week = new Date(new Date().setDate(new Date().getDate()+1)).getDay()
  }
  if (time=="后天") {
    week = new Date(new Date().setDate(new Date().getDate()+2)).getDay()
  }
  if (week==0) {
    week = 7
  }
  let timec = String(index + 1)
  if (timec=="10") {
    timec = "a"
  }
  if (timec=="11") {
    timec = "b"
  }
  if (timec=="12") {
    timec = "c"
  }

  let [classInfo, setClassInfo] = useState({} as any)

  const fetchCourse = async () => {
    const res = await fetch(`/api/class?week=${week}&time=${timec}&place=${classroom+name}`).then(res => res.json())
    if (res.length === 0) {
      setClassInfo({name: "无课"})
      return
    }
    setClassInfo(res[0])
  }
  // 确保只在第一次渲染时调用
  useEffect(() => {
    fetchCourse()
    console.log(classroom+name,week,timec,time)
  }, [])
  return (
    <div>
      {
        classInfo.name === "无课" ? <div className="text-sm">
            <p>{classroom + name}  第{index + 1}节</p>
            <p>未查询到课程信息</p>
          </div> : (
          <div className="text-sm">
            <p>{classroom + name}  第{index + 1}节</p>
            <h2 className="font-bold text-base">{classInfo.name}</h2>
            <p>{classInfo.teacher}</p>
          </div>
        )
      }
    </div>
  )
}