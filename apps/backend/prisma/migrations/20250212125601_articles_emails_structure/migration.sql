/*
  Warnings:

  - You are about to drop the column `content` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `emails` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "emails" DROP CONSTRAINT "emails_project_id_fkey";

-- DropIndex
DROP INDEX "emails_project_id_idx";

-- AlterTable
ALTER TABLE "articles" DROP COLUMN "content";

-- AlterTable
ALTER TABLE "emails" DROP COLUMN "project_id";
