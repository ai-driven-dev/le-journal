/*
  Warnings:

  - You are about to drop the column `onboarded_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "onboarded_at",
DROP COLUMN "refresh_token",
ADD COLUMN     "google_refresh_token" TEXT,
ADD COLUMN     "onboarding_starts_at" TIMESTAMP(3);
