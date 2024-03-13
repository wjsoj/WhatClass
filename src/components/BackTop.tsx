'use client'
import { useEffect } from "react";
export default function BackTop(){
  // 滚动一定距离后显示返回顶部按钮
  useEffect(() => {
    window.onscroll = function() {
      let backtop = document.getElementById("backtop");
      if (!backtop) return;
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300 && backtop) {
        backtop.style.display = "block";
      } else {
        backtop.style.display = "none";
      }
    }
  }, [])
  return (
    <div className="fixed bottom-8 right-4 z-50 hidden" id="backtop">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="p-2 bg-slate-200 dark:bg-slate-700 rounded-xl shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m18 9-6-6-6 6"/><path d="M12 3v14"/><path d="M5 21h14"/></svg>
      </button>
    </div>
  )
}