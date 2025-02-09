/*
  Warnings:

  - A unique constraint covering the columns `[user_id,project_number]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,slug]` on the table `projects` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "projects_project_number_key";

-- DropIndex
DROP INDEX "projects_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "projects_user_id_project_number_key" ON "projects"("user_id", "project_number");

-- CreateIndex
CREATE UNIQUE INDEX "projects_user_id_slug_key" ON "projects"("user_id", "slug");
