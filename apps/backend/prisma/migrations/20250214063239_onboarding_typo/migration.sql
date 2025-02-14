/*
  Warnings:

  - You are about to drop the column `onboarding_starts_at` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "onboarding_starts_at",
ADD COLUMN     "onboarding_started_at" TIMESTAMP(3);
