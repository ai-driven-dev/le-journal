/*
  Warnings:

  - The values [CANCELLED,EXPIRED] on the enum `subscription_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "subscription_status_new" AS ENUM ('ACTIVE', 'IN_PROGRESS', 'PENDING', 'FAILED');
ALTER TABLE "newsletters" ALTER COLUMN "subscription_status" DROP DEFAULT;
ALTER TABLE "newsletters" ALTER COLUMN "subscription_status" TYPE "subscription_status_new" USING ("subscription_status"::text::"subscription_status_new");
ALTER TYPE "subscription_status" RENAME TO "subscription_status_old";
ALTER TYPE "subscription_status_new" RENAME TO "subscription_status";
DROP TYPE "subscription_status_old";
ALTER TABLE "newsletters" ALTER COLUMN "subscription_status" SET DEFAULT 'ACTIVE';
COMMIT;
