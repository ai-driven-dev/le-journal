/*
  Warnings:

  - A unique constraint covering the columns `[user_id,google_filter_id]` on the table `projects` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "google_filter_id" TEXT,
ALTER COLUMN "google_label_id" DROP NOT NULL,
ALTER COLUMN "google_label_name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "projects_user_id_google_filter_id_key" ON "projects"("user_id", "google_filter_id");
