const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

async function main() {
  async function createCourse(item) {
    await prisma.course.create({
      data: {
        category: item.category,
        name: item.name,
        type: item.type,
        credit: item.credit,
        teacher: item.teacher,
        number: item.number,
        school: item.school,
        major: item.major,
        grade: item.grade,
        time: item.time,
        note: item.note,
        stime: item.stime,
      },
    });
  }
  const fs = require("fs");
  const path = require("path");
  const filePath = path.resolve(__dirname, "./course2.json");
  const course = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  // 遍历，每100个一组
  for (let i = 0; i < course.length; i += 100) {
    await Promise.all(course.slice(i, i + 100).map(createCourse));
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })