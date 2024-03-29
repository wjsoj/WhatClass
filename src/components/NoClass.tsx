import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useFormStatus,useFormState } from "react-dom"
import { createClass } from "@/lib/action"
import { toast } from "./ui/use-toast"
import { useEffect } from "react"
import { options3,options2 } from "@/components/options"

const initState = {
  message: "",
}

function Submit() {
  const { pending } = useFormStatus();
  return (<>{
    pending ?
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      请稍候...
    </Button> :
    <Button  type="submit">提交</Button>
  }</>
  );
}

function Form() {
  const [state, formAction] = useFormState(createClass, initState);
  useEffect(() => {
    if (state.message) {
      toast({title:state.message})
      const closedialog = document.getElementById("closeDialog");
      if (closedialog) {
        setTimeout(() => {
          closedialog.click();
        },500)
      }
    }
  }, [state.message])
  return (
    <form action={formAction}>
      <div className="grid gap-2 py-4">
        {/* <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            学号
          </Label>
          <Input
            name="username"
            placeholder="测试用"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            密码
          </Label>
          <Input
            name="password"
            placeholder="测试用"
            className="col-span-3"
            type="password"
          />
        </div> */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            课程名称*
          </Label>
          <Input  
            name="name"
            required
            defaultValue="地震概论"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="time" className="text-right">
            时间地点*
          </Label>
          <Input
            name="time"
            required
            defaultValue="每周周五10~11节 二教101"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="teacher" className="text-right">
            主讲教师*
          </Label>
          <Input
            name="teacher"
            required
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="note" className="text-right">
            备注
          </Label>
          <Input
            name="note"
            placeholder="备注"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">
            开课单位
          </Label>
          <Select name="school"
          >
            <SelectTrigger className='col-span-3'>
              <SelectValue placeholder="选择开课单位"/>
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
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">
            课程类别
          </Label>
          <Select name="category"
          >
            <SelectTrigger className='col-span-3'>
              <SelectValue placeholder="选择课程类别"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options3.map((option) => (
                  <SelectItem key={option.value} value={option.value||'all'}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Submit />
      </DialogFooter>
    </form>
  )
}

export default function NoClass() {
  return (
    <div className="flex flex-col justify-center items-center px-10">
      {/* 添加一行分割线 */}
      <div className="w-full h-px bg-gray-700 dark:bg-gray-200 my-2"></div>
      <h1 className="text-xl font-semibold text-slate-600 dark:text-slate-200 my-4">没有找到符合条件的课程</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full" variant="secondary">补充课程信息</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>添加课程信息</DialogTitle>
            <DialogDescription>
              请尽可能提供详细信息，注意：提交将立即生效并写入数据库，请为自己的行为负责。
            </DialogDescription>
          </DialogHeader>
          <Form/>
        </DialogContent>
      </Dialog>
    </div>
  )
}