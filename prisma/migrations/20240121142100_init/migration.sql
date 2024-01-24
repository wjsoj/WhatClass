-- CreateTable
CREATE TABLE "course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "credit" TEXT NOT NULL,
    "major" TEXT,
    "school" TEXT,
    "teacher" TEXT,
    "time" TEXT,
    "stime" TEXT,
    "grade" TEXT,
    "number" TEXT,
    "note" TEXT
);
