-- AlterTable
ALTER TABLE "users" ADD COLUMN     "google_scope" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "onboarded_at" TIMESTAMP(3),
ADD COLUMN     "onboarding_completed_at" TIMESTAMP(3);
