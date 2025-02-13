/*
  Warnings:

  - You are about to drop the column `user_id` on the `newsletters` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "newsletters_user_id_idx";

-- AlterTable
ALTER TABLE "newsletters" DROP COLUMN "user_id";
