'use client'

import {options,options2,tskoptions,engoptions} from './options'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from 'react'
import ClassCard from '@/components/ClassCard'
import NoClass from '@/components/NoClass'
import InfiniteScroll from 'react-infinite-scroll-component';
import { RotateCcw } from 'lucide-react';

interface Course {
  id: number;
  name: string;
  category: string;
  type: string;
  credit: string;
  major: string;
  school: string;
  teacher: string;
  time: string;
  stime: string;
  grade: string;
  number: string;
  note: string;
}

export default function Search(){
  let [loading,setLoading] = useState(false)
  let [isTrigger,setTrigger] = useState(false)
  let [classList,setClassList] = useState<Course[]>([])
  let [inputValue,setInputValue] = useState({
    name:'',
    week:'',
    time:'',
    teacher:'',
    place:'',
    category:'',
    school:'',
    tsk:'',
    engrade:'',
  })
  let [hasMore,setHasMore] = useState(true)
  const listSize = 10

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      fetchClass()
    }
  }
  async function fetchClass(){
    if (inputValue.category === 'all') inputValue.category = ''
    if (inputValue.school === 'all') inputValue.school = ''
    // 如果全部为空
    if (inputValue.name==='' && inputValue.week==='' && inputValue.time==='' && inputValue.teacher==='' && inputValue.place==='' && inputValue.category==='' && inputValue.school==='') {
      toast({variant: "destructive",title:'请至少输入一项查询条件！',})
      return
    }
    if (inputValue.tsk === 'all') inputValue.tsk = ''
    if (inputValue.engrade === 'all') inputValue.engrade = ''
    // init
    setHasMore(true)

    setLoading(true)
    const res = await fetch('/api/search',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({...inputValue,cursorNum:1})
    })
    await res.json().then((data)=>{
      if (data.length < listSize) setHasMore(false)
      setClassList(data)
      setLoading(false)
      setTrigger(true)
    })
  }

  async function fetchData(){
    const res = await fetch('/api/search',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({...inputValue,cursorNum: classList[classList.length-1].id + 1})
    })
    await res.json().then((data)=>{
      setClassList([...classList,...data])
      if (data.length < listSize) setHasMore(false)
    })
  }

  return (
    <div className='grid grid-col-1 gap-3 px-4 my-6'>
      {/* 输入 */}
      <div className="grid grid-cols-4 items-center gap-2">
        <Label htmlFor="name" className="text-right">
          课程名称：
        </Label>
        <Input
          placeholder='课程名称'
          className="col-span-3"
          value={inputValue.name}
          onChange={(e)=>setInputValue({...inputValue,name:e.target.value})}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="flex flex-row space-x-2 justify-center items-center">
        <Label className="ml-2 shrink-0">星期</Label>
          <Select value={inputValue.week} onValueChange={(e)=>{setInputValue({...inputValue,week:e})}}>
            <SelectTrigger>
              <SelectValue placeholder="选择星期" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">一</SelectItem>
                <SelectItem value="2">二</SelectItem>
                <SelectItem value="3">三</SelectItem>
                <SelectItem value="4">四</SelectItem>
                <SelectItem value="5">五</SelectItem>
                <SelectItem value="6">六</SelectItem>
                <SelectItem value="0">日</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        <Label className="ml-2 shrink-0">节数</Label>
          <Select value={inputValue.time} onValueChange={(e)=>{setInputValue({...inputValue,time:e})}}>
            <SelectTrigger>
              <SelectValue placeholder="选择节数" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>上午</SelectLabel>
                <SelectItem value="1">1 <span className="text-[12px] text-slate-600 dark:text-slate-400">(8:00-8:50)</span></SelectItem>
                <SelectItem value="2">2 <span className="text-[12px] text-slate-600 dark:text-slate-400">(9:00-9:50)</span></SelectItem>
                <SelectItem value="3">3 <span className="text-[12px] text-slate-600 dark:text-slate-400">(10:10-11:00)</span></SelectItem>
                <SelectItem value="4">4 <span className="text-[12px] text-slate-600 dark:text-slate-400">(11:10-12:00)</span></SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>下午</SelectLabel>
                <SelectItem value="5">5 <span className="text-[12px] text-slate-600 dark:text-slate-400">(13:00-13:50)</span></SelectItem>
                <SelectItem value="6">6 <span className="text-[12px] text-slate-600 dark:text-slate-400">(14:00-14:50)</span></SelectItem>
                <SelectItem value="7">7 <span className="text-[12px] text-slate-600 dark:text-slate-400">(15:10-16:00)</span></SelectItem>
                <SelectItem value="8">8 <span className="text-[12px] text-slate-600 dark:text-slate-400">(16:10-17:00)</span></SelectItem>
                <SelectItem value="9">9 <span className="text-[12px] text-slate-600 dark:text-slate-400">(17:10-18:00)</span></SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>晚上</SelectLabel>
                <SelectItem value="a">10 <span className="text-[12px] text-slate-600 dark:text-slate-400">(18:40-19:30)</span></SelectItem>
                <SelectItem value="b">11 <span className="text-[12px] text-slate-600 dark:text-slate-400">(19:40-20:30)</span></SelectItem>
                <SelectItem value="c">12 <span className="text-[12px] text-slate-600 dark:text-slate-400">(20:40-21:30)</span></SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="teacher" className="text-right">
          教师：
        </Label>
        <Input
          name="teacher"
          value={inputValue.teacher}
          placeholder='教师姓名'
          className="col-span-3"
          onChange={(e)=>setInputValue({...inputValue,teacher:e.target.value})}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="place" className="text-right">
          教室：
        </Label>
        <Input
          name="place"
          value={inputValue.place}
          placeholder='上课地点（如：理教107、二教）'
          className="col-span-3"
          onChange={(e)=>setInputValue({...inputValue,place:e.target.value})}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">
          课程类别：
        </Label>
        <Select value={inputValue.category}
          onValueChange={(e)=>{setInputValue({...inputValue,category:e})}}
        >
          <SelectTrigger className='col-span-3'>
            <SelectValue placeholder="选择课程类别（默认全部）"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value||'all'}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {inputValue.category === '通识课' && <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">
          通选课：
        </Label>
        <Select value={inputValue.tsk}
          onValueChange={(e)=>{setInputValue({...inputValue,tsk:e})}}
        >
          <SelectTrigger className='col-span-3'>
            <SelectValue placeholder="选择通选课类别"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {tskoptions.map((option) => (
                <SelectItem key={option.value} value={option.value||'all'}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>}
      {inputValue.category === '英语课' && <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">
          英语课：
        </Label>
        <Select value={inputValue.engrade}
          onValueChange={(e)=>{setInputValue({...inputValue,engrade:e})}}
        >
          <SelectTrigger className='col-span-3'>
            <SelectValue placeholder="选择英语课分级"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {engoptions.map((option) => (
                <SelectItem key={option.value} value={option.value||'all'}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">
          开课单位：
        </Label>
        <Select value={inputValue.school}
          onValueChange={(e)=>{setInputValue({...inputValue,school:e})}}
        >
          <SelectTrigger className='col-span-3'>
            <SelectValue placeholder="选择开课单位（默认全部）"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options2.map((option) => (
                <SelectItem key={option.value} value={option.value||'all'}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      

      {/* 按钮 */}
      {loading ? <Button className="mt-4 mx-10 rounded-lg shadow-lg transition-all" variant="default" disabled><Loader2 className="mr-2 h-5 w-5 animate-spin" />查询中...</Button>:<div className='flex flex-row w-full justify-center px-6'><Button className="mt-4 rounded-lg shadow-lg transition-all grow" variant="default" onClick={fetchClass}>查询</Button><Button className='mt-4 ml-2' variant="secondary" onClick={()=>setInputValue({name:'',week:'',time:'',teacher:'',place:'',category:'',school:'',tsk:'',engrade:''})}><RotateCcw/></Button></div>}
      

      {/* 数据展示 */}
      {loading ? <div className="flex flex-row w-full justify-center items-center">
        <div className="loading w-10 h-10 mt-6"></div>
        <span className="mt-6 ml-4 text-lg">正在查询，请稍候...</span></div> : <div className="flex flex-col w-full justify-center" >
        {isTrigger && (classList.length === 0 ? 
          <NoClass /> : <InfiniteScroll
            dataLength={classList.length} 
            next={fetchData}
            hasMore={hasMore}
            loader={<p className='text-center'>加载中...</p>}
            endMessage={<>
              <div className="w-full h-px bg-gray-700 dark:bg-gray-200 mt-8 mb-2"></div>
              <p className='text-center'>
                共找到 {classList.length} 门课程
              </p>
              </>}
          >
            {classList.map((course: any)=> <ClassCard key={course.id} data={course} fold/>)}
          </InfiniteScroll>
        )}
      </div>}

      {/* classList.map((course: any)=><ClassCard key={course.id} data={course} fold/>) */}
    </div>
  )
}