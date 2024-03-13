import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function POST(request: Request) {
  const {name,week,time,teacher,place,category,school,tsk,engrade,cursorNum} = await request.json()
  // 从数据库中查找，所有查询参数都有可能是空字符串
  const result = await prisma.course.findMany({
    take: 10,
    cursor: {
      id: cursorNum,
    },
    where: {
      AND: [
        name==="" ? {} : {
          name: {
            contains: name,
          },
        },
        engrade==="" ? {} : {
          name: {
            contains: engrade,
          },
        },
        teacher==="" ? {} : {
          teacher: {
            contains: teacher,
          },
        },
        place==="" ? {} : {
          time: {
            contains: place,
          },
        },
        category==="" ? {} : {
          category: {
            contains: category,
          },
        },
        school==="" ? {} : {
          school: {
            contains: school,
          },
        },
        tsk==="" ? {} : {
          type: {
            contains: tsk,
          },
        },
      ],
      stime: {
        contains: week==="" ? (time==="" ? "" : "@"+time) : (time==="" ? week+"@" : week+"@"+time),
      },
    },
    orderBy: {
      id: 'asc',
    },
  })
  return Response.json(result)
}
