'use client'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from 'lucide-react'
import { useGSAP } from '@gsap/react';
import MainCard from '@/components/mainCard';

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    gsap.fromTo("#part1", {
      scrollTrigger: "#part1",
      opacity: 0,
      duration: 1,
      y: 250,
      ease: "power2.out",
    },{
      opacity: 1,
      y: 0,
    }
    );
  });
  return (
    <div className='flex flex-col justify-center items-center px-6 py-10 opacity-0' id='part1'>
      <div id='hero'>
        <div className='rounded-full bg-blue-200/40 dark:bg-sky-900/60 backdrop-blur-lg px-4 py-1 mb-4 ml-2 md:ml-0 self-start text-sky-800 dark:text-slate-300 text-sm font-semibold md:self-center'>
          <Star className='inline-block mr-1 w-4 h-4 mb-0.5' />
          每学期收录约3000门课程信息
        </div>
        <h1 className='font-bold text-4xl leading-[2.8rem] text-slate-600 dark:text-slate-200 md:text-center'>
          更便捷的课程查询,<br />
          从 <span className='text-gradient'>WhatClass</span> <br className='sm:hidden' />
          开始
        </h1>
      </div>
      <div id='maincard' className='w-full'>
        <MainCard />
      </div>
    </div>
  )
}
