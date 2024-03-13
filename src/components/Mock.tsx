'use client'
import { useEffect } from 'react'

export default function Mock({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let scrollableDiv = document.getElementById("scrollableDiv")
    if (!scrollableDiv) return
    scrollableDiv.onscroll = function() {
      let backtop = document.getElementById("backtop");
      if (!backtop) return;
      if ((scrollableDiv as Element).scrollTop > 200 || document.documentElement.scrollTop > 200 && backtop) {
        backtop.style.display = "block";
      } else {
        backtop.style.display = "none";
      }
    }
  }, [])
  return(
    <div className="relative mx-auto h-[720px] w-[380px] border-4 border-black dark:border-slate-300 rounded-2xl flex flex-col items-center mock-shadow">
      <span className="fixed border border-black bg-black w-16 h-4 mt-2 rounded-full"></span>
      <div className='flex-col items-center w-full flex mt-6 overflow-y-scroll' id="scrollableDiv">
        {children}
      </div>
      <div className="absolute bottom-8 right-4 z-50 hidden" id="backtop">
        <button
          onClick={() => (document.getElementById("scrollableDiv")as Element).scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-2 bg-slate-200 dark:bg-slate-700 rounded-xl shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m18 9-6-6-6 6"/><path d="M12 3v14"/><path d="M5 21h14"/></svg>
        </button>
      </div>
      <span className="absolute -right-1.5 top-20 border-2 border-black dark:border-white h-10 rounded-md"></span>
      <span className="absolute -left-1.5 top-16 border-2 border-black dark:border-white h-6 rounded-md"></span>
      <span className="absolute -left-1.5 top-32 border-2 border-black dark:border-white h-12 rounded-md"></span>
      <span className="absolute -left-1.5 top-48 border-2 border-black dark:border-white h-12 rounded-md"></span>
    </div>
  )
}