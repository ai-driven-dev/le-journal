/*
  Warnings:

  - A unique constraint covering the columns `[newsletter_alias]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `newsletter_alias` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "newsletter_alias" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "projects_newsletter_alias_key" ON "projects"("newsletter_alias");
