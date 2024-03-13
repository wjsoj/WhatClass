export async function POST(request: Request) {
  const {username,password} = await request.json()
  // 构造请求体，x-www-form-urlencoded
  const formdata = new URLSearchParams();
  formdata.append('appid', 'portal2017');
  formdata.append('userName', username);
  formdata.append('password', password);
  formdata.append('randCode', '');
  formdata.append('smsCode', '');
  formdata.append('otpCode', '');
  formdata.append('redirUrl', 'https://portal.pku.edu.cn/portal2017/ssoLogin.do');

  const res = await fetch("https://iaaa.pku.edu.cn/iaaa/oauthlogin.do", {
      headers: {
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0",
          "Accept": "application/json, text/javascript, */*; q=0.01",
          "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest",
          "Sec-GPC": "1",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin"
      },
      body: formdata,
      method: "POST"
  }).then(res => res.json())
  .catch(()=>{
    return {'message':'Internal Server Error'}
  })
  return Response.json(res)
  // return Response.json({"message":"ERROR"})
}