export async function POST(req: Request) {
  const {classroom,time} = await req.json()
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const reqForm = new FormData();
  reqForm.append('buildingName', classroom);
  reqForm.append('time', time);
  const classInfo = await fetch('https://portal.pku.edu.cn/portal2017/publicsearch/classroom/retrClassRoomFree.do',{
    method: 'POST',
    headers: {
      'Origin': 'https://portal.pku.edu.cn',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
      'Referer': 'https://portal.pku.edu.cn/portal2017/',
      'Access-Control-Allow-Origin': '*',
    },
    body: reqForm,
  }).then(res => res.json())
  // console.log(classInfo)
  return Response.json(classInfo)
}