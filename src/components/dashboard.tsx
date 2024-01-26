import { getClient } from '@umami/api-client';

export default async function Dashboard(){
  const client = getClient();
  const siteID = 'd28f9b38-7464-4f2d-b66c-dbef389d728c';
  const nowActive = await client.getWebsiteActive(siteID).then(res => res.data) || [{'x': 'error'}]
  const dayVisit = await client.getWebsiteStats(siteID,{
    // 使用时间戳
    startAt: Date.now() - 1000 * 60 * 60 * 24,
    endAt: Date.now(),
    // url: '/'
  }).then(res => res.data)
  const monthVisit = await client.getWebsiteStats(siteID,{
    startAt: Date.now() - 1000 * 60 * 60 * 24 * 30,
    endAt: Date.now(),
    // url: '/'
  }).then(res => res.data)

  return (
    <>
    <div className='text-center text-sm text-slate-600 dark:text-slate-200 font-semibold my-4 py-1'>
      当前访问人数：{nowActive[0].x}
    </div>
    <div className='grid grid-cols-4 mx-4 mb-4'>
      <div>
        <h2 className='text-3xl text-center font-extrabold mb-1'>
          {dayVisit?.uniques.value}
        </h2>
        <p className='text-center font-xl font-bold text-slate-700 dark:text-slate-200'>访客</p>
        <p className='text-center text-[12px]'>最近24h</p>
      </div>
      <div >
        <h2 className='text-3xl text-center font-extrabold mb-1'>
          {dayVisit?.pageviews.value}
        </h2>
        <p className='text-center font-xl font-bold text-slate-700 dark:text-slate-200'>浏览量</p>
        <p className='text-center text-[12px]'>最近24h</p>
      </div>
      <div >
        <h2 className='text-3xl text-center font-extrabold mb-1'>
          {monthVisit?.uniques.value}
        </h2>
        <p className='text-center font-xl font-bold text-slate-700 dark:text-slate-200'>访客</p>
        <p className='text-center text-[12px]'>最近30天</p>
      </div>
      <div >
        <h2 className='text-3xl text-center font-extrabold mb-1'>
          {monthVisit?.pageviews.value}
        </h2>
        <p className='text-center font-xl font-bold text-slate-700 dark:text-slate-200'>浏览量</p>
        <p className='text-center text-[12px]'>最近30天</p>
      </div>
    </div>
    </>
  )
}