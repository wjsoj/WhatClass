const dataCache = new Map()

export async function POST(req: Request) {
  const {classroom,time} = await req.json()
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // 添加数据缓存，如果当天已经查询过，则直接返回缓存数据
  // const reqForm = new FormData();
  // reqForm.append('buildingName', classroom);
  // reqForm.append('time', time);
  if(dataCache.has(classroom+time)) {
    const cacheTime = new Date(dataCache.get(classroom+time)['time'])
    if (new Date().getDate() == cacheTime.getDate()) {
      console.log('cache hit')
      return Response.json(dataCache.get(classroom+time)['content'])
    }
  }

  const classInfo = await fetch(`https://portal.pku.edu.cn/publicQuery/classroomQuery/retrClassRoomFree.do?buildingName=${classroom}&time=${time}`, {
    "credentials": "omit",
    "headers": {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
        "Priority": "u=1"
    },
    "method": "GET",
    "mode": "cors"
  }).then(res => res.json())
  dataCache.set(classroom+time,{
    time: new Date(),
    content: classInfo
  })
  // console.log(classInfo)
  return Response.json(classInfo)
}