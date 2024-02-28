import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { useState,useEffect } from "react";
import ClassCard from "./ClassCard";
import { useToast } from "@/components/ui/use-toast"
import NoClass from "./NoClass";
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { nowClass } from "./options";

export default function MainCard() {
  const {toast} = useToast()
  let [classList, setClassList] = useState([]) 
  let [loading, setLoading] = useState(false)
  let [isTrigger, setTrigger] = useState(false)
  let nowWeek = new Date().getDay().toString();
  if (nowWeek === "0") {
    nowWeek = "7";
  }
  let [week, setWeek] = useState(nowWeek);
  let [isChecked, setChecked ] = useState(true);
  const changeWeek=
    (value: string) => {
      setWeek(value)
    }
  
  let [classNum, setClassNum] = useState(nowClass())
  let [classroom, setClassroom] = useState("")
  const changeClass=
    (value: string) => {
      setClassNum(value);
    }
  useEffect(() => {
    if(week === nowWeek && classNum === nowClass()) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [week, classNum,nowWeek])

  const changeChecked =(checked: boolean) => {
    if (checked) {
      setWeek(nowWeek);
      setClassNum(nowClass());
    }
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      fetchClass()
    }
  }

  async function fetchClass(){
    if (classroom==="") {
      toast({
        variant: "destructive",
        title: "请输入教室名称,教室名称不能为空",
      })
      return;
    }
    setLoading(true);
    // GET /api/classroom?week=week&time=classNum&place=classroom
    await fetch(`/api/class?week=${week}&time=${classNum}&place=${classroom}`).then(res => res.json()).then(data => {
      setClassList(data)
      setLoading(false)
    })
    if (!isTrigger) {
      setTrigger(true)
    }
  }

  useGSAP(() => {
    gsap.fromTo("#hero", {
      opacity: 1,
      duration: 1,
      y: 0,
      ease: "power2.out",
    },{
      opacity: isTrigger ? 0 : 1,
      y: isTrigger ? -350 : 0,
    }
    );
    gsap.to("#maincard", {
      transform: isTrigger ? "translateY(-230px)" : "none",
      marginBottom: isTrigger ? "-230px" : "0px",
    }
    );
  }, [isTrigger]);

  return (
    <>
    <div className="w-full px-4 py-6 my-8 bg-gradient-to-br from-pink-100/40 to-slate-200 dark:from-violet-700/30 dark:to-slate-700/40 backdrop-filter backdrop-blur-xl rounded-lg shadow-xl flex flex-col">
      <div className="flex flex-row space-x-2 justify-center items-center mb-2">
        <div className="grow">
          <Label className="ml-2 text-lg">星期</Label>
          <Select onValueChange={changeWeek} value={week}>
            <SelectTrigger className="mb-2">
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
                <SelectItem value="7">日</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grow">
          <Label className="ml-2 text-lg">节数</Label>
          <Select value={classNum} onValueChange={changeClass}>
            <SelectTrigger className="mb-2">
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
      </div>

      <div className="flex flex-row space-x-2 justify-center items-center mb-2">
        <Checkbox checked={isChecked} onCheckedChange={changeChecked}/>
        <Label className="ml-2">使用当前时间</Label>
      </div>
      
      <Label htmlFor="classroom" className="ml-2 text-lg">教室</Label>
      <Input
        id="classroom"
        value={classroom}
        onChange={e=>setClassroom(e.target.value)}
        onKeyDown={handleKeyDown}
        className="shadow-inner rounded-md"
        placeholder="教室名称，如：理教207、一教101"
      />
      
      {loading ? <Button className="mt-4 mx-10 rounded-lg shadow-lg transition-all" variant="default" disabled><Loader2 className="mr-2 h-4 w-4 animate-spin" />查询中...</Button>:<Button className="mt-4 mx-10 rounded-lg shadow-lg transition-all" variant="default" onClick={fetchClass}>查询</Button>}
    </div>
      {loading ? <div className="flex flex-row w-full justify-center items-center">
        <div className="loading w-10 h-10 mt-6"></div>
        <span className="mt-6 ml-4 text-lg">正在查询，请稍候...</span></div> : <div className="flex flex-col w-full justify-center" >
        {(classList.length === 0 && isTrigger) ? 
          <NoClass />: classList.map((course: any)=>
          <ClassCard key={course.id} data={course}/>
        )}
      </div>}
    </>
  )
}