/*
  Warnings:

  - You are about to drop the column `newsletter_alias` on the `projects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email_alias]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,google_label_name]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,google_label_id]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email_alias` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `google_label_id` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `google_label_name` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "projects_newsletter_alias_key";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "newsletter_alias",
ADD COLUMN     "email_alias" TEXT NOT NULL,
ADD COLUMN     "google_label_id" TEXT NOT NULL,
ADD COLUMN     "google_label_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "projects_email_alias_key" ON "projects"("email_alias");

-- CreateIndex
CREATE UNIQUE INDEX "projects_user_id_google_label_name_key" ON "projects"("user_id", "google_label_name");

-- CreateIndex
CREATE UNIQUE INDEX "projects_user_id_google_label_id_key" ON "projects"("user_id", "google_label_id");
