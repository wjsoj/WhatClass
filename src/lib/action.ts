'use server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createClass(prevState: any,formData: FormData) {
  const rawFormData = {
    // username: formData.get('username'),
    // password: formData.get('password'),
    name: formData.get('name'),
    time: formData.get('time'),
    teacher: formData.get('teacher'),
    note: formData.get('note'),
    category: formData.get('category'),
    school: formData.get('school'),
  }
  if (rawFormData.name == '' || rawFormData.time == '' || rawFormData.teacher == '') {
    return {
      message: '课程名称、时间地点、主讲教师为必填项',
    }
  }
  function process(timem: string) {
    let times = timem.match(/周周(.?)(\d+)~(\d+)/g);
    if (times === null || times.length === 0) {
        return '';
    }
    let todigit: { [key: string]: string } = {
        '一': '1',
        '二': '2',
        '三': '3',
        '四': '4',
        '五': '5',
        '六': '6',
        '日': '7'
    };
    let result = [];
    for (let time of times) {
        let parts = time.match(/周周(.?)(\d+)~(\d+)/);
        if (parts === null || parts.length < 4) continue;
        let week = todigit[parts[1]];
        let st = parseInt(parts[2]);
        let ed = parseInt(parts[3]);
        for (let i = st; i <= ed; i++) {
            // 转成16进制
            let ii = i.toString(16);
            result.push(week + '@' + ii);
        }
    }
    return result.join(' ');
  }
  await prisma.course.create({
    data: {
      name: String(rawFormData.name),
      time: String(rawFormData.time),
      teacher: String(rawFormData.teacher),
      note: String(rawFormData.note) || '',
      category: rawFormData.category === '通识课' ? '通识课' : String(rawFormData.category),
      school: rawFormData.school === 'all' ? '' : String(rawFormData.school),
      type: String(rawFormData.category) || '',
      stime: process(String(rawFormData.time)),
    },
  }).catch((e) => {
    return {
      message: '创建失败',
    }
  })
  return {
    message: '创建成功，可再次查询查看结果',
  }
}