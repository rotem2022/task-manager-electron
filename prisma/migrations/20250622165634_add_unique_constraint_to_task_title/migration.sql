/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "dueDate" SET DEFAULT CURRENT_TIMESTAMP + interval '7 day';

-- CreateIndex
CREATE UNIQUE INDEX "Task_title_key" ON "Task"("title");
