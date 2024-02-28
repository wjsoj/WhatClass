import { nowEmptyClass } from "./options"
import { Badge } from "./ui/badge"

export default function EmptyClassroom({classroom,floor,loading}:{classroom: Array<Object>,floor: Array<number>,loading : boolean}) {
  // 根据楼层和时间筛选教室
  const filterRoom = (classroom: Array<Object>, nowfloor: number, timeRange: Array<string>) => {
    return classroom.filter((item: any) => item.room.startsWith(nowfloor) || item.room.startsWith("C"+nowfloor.toString())).filter((item: any) => {
    // 对每个教室的课程进行筛选，寻找对应 "c"+timeRange 每一项字段均为""的教室
      return timeRange.every((time: string) => item["c"+time] === "")
    }).map((item: any) => item.room)
  }

  return (
    <>
    {nowEmptyClass().map((timeRange, index) => (
      <div key={index} className=" flex flex-col items-center pb-6 w-full">
        <h3 className="text-2xl font-bold pl-4 my-2 w-full">{timeRange[0]+ "-" + timeRange[timeRange.length - 1]}节</h3>
        {
          // 从floor[0] 数到 floor[1]，例如[1,5]，则显示1-5楼
          Array.from({ length: floor[1] - floor[0] + 1 }, (_, i) => i + floor[0]).map((item: number, index: number) => (
            <div key={index} className="grid grid-cols-5 w-full px-4">
              <h2 key={index} className="py-[3px]">第{item}层</h2>
              <div className=" col-span-4 flex flex-row flex-wrap">
                {filterRoom(classroom, item, timeRange).map((room: any, index: number) => (
                  <Badge key={index} className="m-1">{room}</Badge>
                ))}
              </div>
            </div>
          ))
        }
      </div>
    ))}
    {loading && <h2 className="text-sm font-bold text-center my-4">加载中...</h2>}
    </>
  )
}