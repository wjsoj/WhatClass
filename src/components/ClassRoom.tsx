import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import RoomInfo from "./RoomInfo"

export default function ClassRoom({classInfo,classroom,classtime}: {classInfo: any,classroom: string,classtime: string}) {
  if (!classInfo.rows) return (<p>ERROR!</p>)
  return (
    <div className="overflow-x-auto w-full px-2">
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
                <td key={index} className={`relative border py-2 ${item[key]==='' ? "bg-green-400 dark:bg-green-700" : "bg-slate-100 dark:bg-slate-700"}`}>
                {item[key] !=='' && <Popover >
                  <PopoverTrigger>
                    <div className="absolute top-0 w-full h-full opacity-0 z-10"></div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <RoomInfo classroom={classroom} name={item.room} time={classtime} index={index}/>
                  </PopoverContent>
                </Popover>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}