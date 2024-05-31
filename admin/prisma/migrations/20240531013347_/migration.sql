/*
  Warnings:

  - You are about to drop the column `billboardId` on the `Image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_billboardId_fkey";

-- DropIndex
DROP INDEX "Image_billboardId_idx";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "billboardId",
ADD COLUMN     "categoryId" TEXT;

-- CreateIndex
CREATE INDEX "Image_categoryId_idx" ON "Image"("categoryId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
