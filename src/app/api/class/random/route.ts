import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const random_id = searchParams.get('id')
  if (random_id == null) {
    return Response.json({ error: '参数不足' })
  }
  // random id between 1 and 177
  // return query result for id = random_id
  const result = await prisma.course.findUnique({
    where: {
      id: parseInt(random_id)
    }
  })
  return Response.json(result)
}