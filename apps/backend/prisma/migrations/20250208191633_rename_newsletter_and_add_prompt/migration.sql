/*
  Warnings:

  - You are about to drop the column `newsletter_subscription_id` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `prompt_instruction` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the `NewsletterSubscription` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `newsletter_email_subscription_id` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_newsletter_subscription_id_fkey";

-- DropForeignKey
ALTER TABLE "NewsletterSubscription" DROP CONSTRAINT "NewsletterSubscription_user_id_fkey";

-- DropIndex
DROP INDEX "Email_newsletter_subscription_id_idx";

-- AlterTable
ALTER TABLE "Email" DROP COLUMN "newsletter_subscription_id",
ADD COLUMN     "newsletter_email_subscription_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "prompt_instruction" TEXT;

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "prompt_instruction";

-- DropTable
DROP TABLE "NewsletterSubscription";

-- CreateTable
CREATE TABLE "NewsletterEmailSubscription" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "newsletter_name" TEXT NOT NULL,
    "newsletter_email" TEXT NOT NULL,
    "newsletter_url" TEXT NOT NULL,
    "status" "SubscriptionStatus" NOT NULL,
    "subscribed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsletterEmailSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "NewsletterEmailSubscription_user_id_idx" ON "NewsletterEmailSubscription"("user_id");

-- CreateIndex
CREATE INDEX "NewsletterEmailSubscription_newsletter_email_idx" ON "NewsletterEmailSubscription"("newsletter_email");

-- CreateIndex
CREATE INDEX "Email_newsletter_email_subscription_id_idx" ON "Email"("newsletter_email_subscription_id");

-- AddForeignKey
ALTER TABLE "NewsletterEmailSubscription" ADD CONSTRAINT "NewsletterEmailSubscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_newsletter_email_subscription_id_fkey" FOREIGN KEY ("newsletter_email_subscription_id") REFERENCES "NewsletterEmailSubscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
