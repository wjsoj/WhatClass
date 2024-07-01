import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  // random id between 1 and 177
  // return query result for id = random_id
  const random_id = Math.floor(Math.random() * 177) + 1
  const result = await prisma.course.findUnique({
    where: {
      id: random_id
    }
  })
  return Response.json(result)
}