'use server'

import { setTimeout } from "timers/promises"

export async function createClass(prevState: any,formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    time: formData.get('time'),
  }
  console.log(rawFormData)
  await setTimeout(1000)
  // refresh page
  return {
    message: '提交成功！可再次查询查看结果'
  }
}