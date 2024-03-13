import { Skeleton } from "./ui/skeleton";

export default function TableSkeleton() {
  return (
    <div className="overflow-x-auto w-full px-2">
      <table className="border-collapse table-fixed rounded-md bg-slate-200 dark:bg-slate-700 text-sm mx-auto w-full">
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
          {Array.from({ length: 8 }, (_, i) => i + 1).map((item: number, index: number) => (
            <tr key={index}>
              <td colSpan={2} className="border text-right px-1"><Skeleton className="h-10 w-8 py-2"/></td>
              <td colSpan={2} className="border text-right px-1"><Skeleton className="h-10 w-8 py-2"/></td>
              {/* 合并成一列，占据12列的位置 */}
              <td colSpan={12} className="border text-right px-2"><Skeleton className="h-8 w-full"/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}