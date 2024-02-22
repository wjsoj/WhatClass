'use client'
import { useState,useEffect } from "react"
import ClassRoom from "@/components/ClassRoom"
import TableSkeleton from "@/components/TableSkeleton"
import Mock from "@/components/Mock"

const classroomList = ["一教","二教","三教","四教","理教","文史","哲学","地学","国关","政管"]
const timeList = ["今天","明天","后天"]

export default function Page() {
  let [classroom, setClassroom] = useState("一教")
  let [classTime, setClassTime] = useState("今天")
  let [classInfo, setClassInfo] = useState({} as any)
  let [Loading, setLoading] = useState(true)

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

  useEffect(() => {
    fetchClassroom(classroom,classTime).then(res => setClassInfo(res))
  }, [classroom,classTime])

  return (
    <>
    <div className="flex-col space-y-4 justify-center my-6 lg:hidden">
      <div className="grid grid-cols-4 px-4">
        {classroomList.map((item, index) => (
          <button key={index} className={`px-4 py-2 rounded-none ${classroom === item ? "bg-sky-300/60 dark:bg-sky-800/40 text-slaye-900 dark:text-white" : " bg-slate-200 dark:bg-slate-700/40 text-slate-600 dark:text-slate-400"}`} onClick={() => setClassroom(item)}>{item}</button>
        ))}
      </div>
      <div className="grid grid-cols-3 px-4">
        {timeList.map((item, index) => (
          <button key={index} className={`px-4 py-2 rounded-none ${classTime === item ? "bg-sky-300/60 dark:bg-sky-800/40 text-slaye-900 dark:text-white" : " bg-slate-200 dark:bg-slate-700/40 text-slate-600 dark:text-slate-400"}`} onClick={() => setClassTime(item)}>{item}</button>
        ))}
      </div>
      {!Loading ? <ClassRoom classInfo={classInfo} classroom={classroom} classtime={classTime} /> : <TableSkeleton />}
    </div>
    
    <div className="hidden lg:block">
      <Mock>
      <div className="flex-col space-y-4 items-center my-6">
        <div className="grid grid-cols-4 px-4">
          {classroomList.map((item, index) => (
            <button key={index} className={`px-4 py-2 rounded-none ${classroom === item ? "bg-sky-300/60 dark:bg-sky-800/40 text-slaye-900 dark:text-white" : " bg-slate-200 dark:bg-slate-700/40 text-slate-600 dark:text-slate-400"}`} onClick={() => setClassroom(item)}>{item}</button>
          ))}
        </div>
        <div className="grid grid-cols-3 px-4">
          {timeList.map((item, index) => (
            <button key={index} className={`px-4 py-2 rounded-none ${classTime === item ? "bg-sky-300/60 dark:bg-sky-800/40 text-slaye-900 dark:text-white" : " bg-slate-200 dark:bg-slate-700/40 text-slate-600 dark:text-slate-400"}`} onClick={() => setClassTime(item)}>{item}</button>
          ))}
        </div>
        {!Loading ? <ClassRoom classInfo={classInfo} classroom={classroom} classtime={classTime} /> : <TableSkeleton />}
      </div>
      </Mock>
    </div>
    </>
  )
}