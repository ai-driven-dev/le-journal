/*
  Warnings:

  - You are about to drop the column `google_scope` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "google_scope",
ADD COLUMN     "google_scopes" TEXT[] DEFAULT ARRAY[]::TEXT[];
