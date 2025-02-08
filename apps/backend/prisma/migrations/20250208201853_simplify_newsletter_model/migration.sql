/*
  Warnings:

  - You are about to drop the column `newsletter_email_subscription_id` on the `emails` table. All the data in the column will be lost.
  - You are about to drop the `newsletter_email_subscriptions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `newsletter_id` to the `emails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "emails" DROP CONSTRAINT "emails_newsletter_email_subscription_id_fkey";

-- DropForeignKey
ALTER TABLE "newsletter_email_subscriptions" DROP CONSTRAINT "newsletter_email_subscriptions_user_id_fkey";

-- DropIndex
DROP INDEX "emails_newsletter_email_subscription_id_idx";

-- AlterTable
ALTER TABLE "emails" DROP COLUMN "newsletter_email_subscription_id",
ADD COLUMN     "newsletter_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "newsletter_email_subscriptions";

-- CreateTable
CREATE TABLE "newsletters" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subscribed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newsletters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "newsletters_user_id_idx" ON "newsletters"("user_id");

-- CreateIndex
CREATE INDEX "newsletters_email_idx" ON "newsletters"("email");

-- CreateIndex
CREATE INDEX "emails_newsletter_id_idx" ON "emails"("newsletter_id");

-- AddForeignKey
ALTER TABLE "newsletters" ADD CONSTRAINT "newsletters_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emails" ADD CONSTRAINT "emails_newsletter_id_fkey" FOREIGN KEY ("newsletter_id") REFERENCES "newsletters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
