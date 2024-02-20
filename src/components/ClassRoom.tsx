
export default function ClassRoom({classInfo}: {classInfo: any}) {
  if (!classInfo.rows) return (<p>ERROR!</p>)
  return (
    <div className="overflow-x-auto w-screen md:max-w-screen-sm px-2">
      <table className="table-fixed rounded-md bg-slate-200 dark:bg-slate-700 text-sm mx-auto w-full">
        <thead className="bg-pink-50/30 dark:bg-slate-700">
          <tr>
            <th colSpan={2} className="border border-slate-300 dark:border-slate-600 font-semibold text-slate-900 dark:text-slate-200 py-1">教室</th>
            <th colSpan={2} className="border border-slate-300 dark:border-slate-600 font-semibold text-slate-900 dark:text-slate-200 py-1">容量</th>
            {/* 1-12 */}
            {Array.from({ length: 12 }, (_, i) => i + 1).map((item: number, index: number) => (
              <th key={index} className="border border-slate-300 dark:border-slate-600 font-semibold text-slate-900 dark:text-slate-200 py-2 ">{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {classInfo.rows.map((item: any, index: number) => (
            <tr key={index}>
              <td colSpan={2} className="border py-3 text-center">{item.room}</td>
              <td colSpan={2} className="border py-3 text-center">{item.cap}</td>
              {Object.keys(item).filter((key: string) => (key[0] === "c" && key!='cap')).map((key: string, index: number) => (
                <td key={index} className={`border py-2 ${item[key]==='' ? "bg-green-400 dark:bg-green-700" : "bg-slate-100 dark:bg-slate-800"}`}>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}