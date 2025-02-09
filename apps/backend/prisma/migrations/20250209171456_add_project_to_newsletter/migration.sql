/*
  Warnings:

  - Added the required column `project_id` to the `newsletters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "newsletters" ADD COLUMN     "project_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "newsletters" ADD CONSTRAINT "newsletters_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
