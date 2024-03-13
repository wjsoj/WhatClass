'use client'

import { useState } from "react"

export default function ClassCard({data,fold}:{data: any,fold?: boolean}) {
  let [isFold, setFold] = useState(fold ? fold : false)
  return (
    <div className="flex flex-col space-y-1 justify-center items-start px-5 py-4 my-4 bg-gradient-to-br from-pink-200/40 to-slate-200 dark:from-violet-700/30 dark:to-slate-700/40 backdrop-filter backdrop-blur-xl rounded-xl shadow-lg border-2 border-sky-800/40 dark:border-sky-400/40">
      <h2 className="text-[22px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-pink-800 dark:from-cyan-300 dark:to-sky-400">
        {data.name}
      </h2>
      {data.teacher && <h3 className="text-slate-900 dark:text-slate-100">
        授课教师： {data.teacher}
      </h3>}
      {data.time && <h3 className="text-slate-900 dark:text-slate-100 flex flex-row">
        <div className=" shrink-0">时间地点：</div>
        <div>{data.time}</div>
      </h3>}
      {isFold ? <div className="flex self-end pr-2">
        <button className="text-sky-800 dark:text-sky-200 hover:text-sky-700 dark:hover:text-sky-300" onClick={()=>setFold(false)}>+ 展开详情</button></div> : 
        <>{data.credit && <h3 className="text-slate-900 dark:text-slate-100">
        学&emsp;&emsp;分：{ data.credit }
        </h3>}
        <h3 className="text-slate-900 dark:text-slate-100">
          所属类别：{ data.category==='通识课' ? (data.type ? data.type : data.category) : data.category }
        </h3>
        {data.school && <h3 className="text-slate-900 dark:text-slate-100">开设单位：{ data.school }
        </h3>}
        {data.major && <h3 className="text-slate-900 dark:text-slate-100 ">所属专业：{ data.major }
        </h3>}
        {data.grade && <h3 className="text-slate-900 dark:text-slate-100 ">所属年级：{ data.grade }
        </h3>}
        {data.note && <h3 className="text-slate-900 dark:text-slate-100 flex flex-row">
          <div className=" shrink-0">备注信息：</div>
          <div >{ data.note }</div>
        </h3>}
        <div className="flex self-end pr-2">
        {fold && <button className="text-sky-800 dark:text-sky-200 hover:text-sky-700 dark:hover:text-sky-300" onClick={()=>setFold(true)}>- 收起详情</button>}</div></>}
    </div>
  )
}