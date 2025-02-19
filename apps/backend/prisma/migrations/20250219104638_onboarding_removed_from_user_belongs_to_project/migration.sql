/*
  Warnings:

  - You are about to drop the column `onboarding_completed_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `onboarding_started_at` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "onboarding_completed_at" TIMESTAMP(3),
ADD COLUMN     "onboarding_started_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "onboarding_completed_at",
DROP COLUMN "onboarding_started_at";
