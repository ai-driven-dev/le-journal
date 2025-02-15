/*
  Warnings:

  - Made the column `google_refresh_token` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `google_refresh_token_iv` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "google_refresh_token" SET NOT NULL,
ALTER COLUMN "google_refresh_token_iv" SET NOT NULL;
