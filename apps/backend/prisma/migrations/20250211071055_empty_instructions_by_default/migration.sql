/*
  Warnings:

  - Made the column `prompt_instruction` on table `projects` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "prompt_instruction" SET NOT NULL,
ALTER COLUMN "prompt_instruction" SET DEFAULT '';
