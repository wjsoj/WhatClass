import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const place = searchParams.get('place')
  const week = searchParams.get('week')
  const time = searchParams.get('time')
  const stime = week + '@' + time
  if (place == null || week == null || time == null) {
    return Response.json({ error: '参数不足' })
  }
  
  const result = await prisma.course.findMany({
    where: {
      stime: {
        contains: stime
      },
      time: {
        contains: place
      }
    }
  })
  return Response.json(result)
}