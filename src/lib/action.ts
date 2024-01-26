'use server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createClass(prevState: any,formData: FormData) {
  const rawFormData = {
    username: formData.get('username'),
    password: formData.get('password'),
    name: formData.get('name'),
    time: formData.get('time'),
    teacher: formData.get('teacher'),
    category: formData.get('category'),
    school: formData.get('school'),
  }
  console.log(rawFormData)
  if (rawFormData.username === '' || rawFormData.password === '') {
    return {
      message: '提交成功！可再次查询查看结果'
    }
  }
  else {
    // fetch post /api/class/verify in server action
    const verify = await fetch('http://localhost:3000/api/class/verify',{
      method: 'POST',
      body: JSON.stringify({
        username: rawFormData.username,
        password: rawFormData.password
      })
    }).then(res => res.json())
    if (!verify.success) {
      return {
        message: '验证失败：'+verify.errors.msg
      }
    }
    else {
      return {
        message: '验证成功'
      }
    }
  }
  // refresh page
}