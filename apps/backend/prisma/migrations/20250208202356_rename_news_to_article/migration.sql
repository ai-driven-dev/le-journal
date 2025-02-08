/*
  Warnings:

  - You are about to drop the `news` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "news" DROP CONSTRAINT "news_email_id_fkey";

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "user_id" DROP NOT NULL;

-- DropTable
DROP TABLE "news";

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "email_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "relevance_score" DOUBLE PRECISION NOT NULL,
    "extracted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "articles_email_id_idx" ON "articles"("email_id");

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_email_id_fkey" FOREIGN KEY ("email_id") REFERENCES "emails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
