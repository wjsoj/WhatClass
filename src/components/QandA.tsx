import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function QandA() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>关于课程数据</AccordionTrigger>
        <AccordionContent>
          每学期初使用爬虫从选课网上获取，由于选课网显示的课程在每个人看来都不一样（比如已经选过的课程就不会出现在选课网上，有的专业课只有本院的人才能看到信息），所以会有很多课程信息缺失，欢迎使用补充功能进行补充（请尽量直接复制选课网中的信息）。另：每学期初爬取课程时得到了一些同学的帮助（特别是每年的大一同学，他们的选课网是最丰富的），在此表示感谢！
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>关于统计信息</AccordionTrigger>
        <AccordionContent>
          网站使用开源项目 <span className=" underline text-sky-800 dark:text-sky-200 hover:text-sky-600 dark:hover:text-sky-300"><a href="https://umami.is/" target="_blank" rel="noreferrer">umami</a></span> 进行用户访问行为的统计，统计的信息包括：访问了哪些页面，在页面停留的时间，请求头中的信息（设备类型、系统信息）、地理位置（最多精确到市级）。统计信息不包含隐私数据且umami进行数据统计不依赖cookies。如果你希望访问行为不被统计，可以在浏览器中开启DNT(Do Not Track)功能，例如使用无痕模式浏览或在浏览器设置界面中进行设置。
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>项目使用到的技术</AccordionTrigger>
        <AccordionContent>
          目前全站开源至github,框架是Next.js。基本都是现学的，所以代码看起来特别混乱。欢迎前往github阅览我的屎山代码（Next.js真是太好玩啦！）
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>关于学号密码验证的问题</AccordionTrigger>
        <AccordionContent>
          目前完全开放创建新课程信息的权限，但是这样有可能导致恶意用户创建大量无用的课程信息，是否需要学号密码验证还在考虑。相关接口已实现完毕，通过模拟用户登录校内门户的行为获取验证信息，进而验证用户身份，目前并未加入到网站中。
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
