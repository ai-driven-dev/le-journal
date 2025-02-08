/*
  Warnings:

  - You are about to drop the column `newsletter_name` on the `newsletter_email_subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `newsletter_url` on the `newsletter_email_subscriptions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "newsletter_email_subscriptions" DROP COLUMN "newsletter_name",
DROP COLUMN "newsletter_url";
