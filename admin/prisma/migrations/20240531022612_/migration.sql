/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_categoryId_fkey";

-- DropIndex
DROP INDEX "Image_categoryId_idx";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "categoryId";

-- CreateTable
CREATE TABLE "PromoImage" (
    "id" TEXT NOT NULL,
    "productId" TEXT,
    "categoryId" TEXT,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromoImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PromoImage_productId_idx" ON "PromoImage"("productId");

-- CreateIndex
CREATE INDEX "PromoImage_categoryId_idx" ON "PromoImage"("categoryId");

-- AddForeignKey
ALTER TABLE "PromoImage" ADD CONSTRAINT "PromoImage_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
