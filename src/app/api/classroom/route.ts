const dataCache = new Map()

export async function POST(req: Request) {
  const {classroom,time} = await req.json()
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // 添加数据缓存，如果当天已经查询过，则直接返回缓存数据
  const reqForm = new FormData();
  reqForm.append('buildingName', classroom);
  reqForm.append('time', time);
  if(dataCache.has(classroom+time)) {
    const cacheTime = new Date(dataCache.get(classroom+time)['time'])
    if (new Date().getDate() == cacheTime.getDate()) {
      console.log('cache hit')
      return Response.json(dataCache.get(classroom+time)['content'])
    }
  }
  const classInfo = await fetch('https://portal.pku.edu.cn/portal2017/publicsearch/classroom/retrClassRoomFree.do',{
    method: 'POST',
    headers: {
      'Origin': 'https://portal.pku.edu.cn',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
      'Referer': 'https://portal.pku.edu.cn/portal2017/',
      'Access-Control-Allow-Origin': '*',
      'X-Forwarded-For': '43.138.86.224',
    },
    body: reqForm,
  }).then(res => res.json())
  dataCache.set(classroom+time,{
    time: new Date(),
    content: classInfo
  })
  // console.log(classInfo)
  return Response.json(classInfo)
}