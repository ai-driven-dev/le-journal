-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('ADMIN', 'PREMIUM', 'REGULAR');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "user_role" NOT NULL DEFAULT 'REGULAR';
