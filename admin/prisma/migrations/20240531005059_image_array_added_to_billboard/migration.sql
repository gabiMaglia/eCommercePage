-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "billboardId" TEXT,
ALTER COLUMN "productId" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Image_billboardId_idx" ON "Image"("billboardId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_billboardId_fkey" FOREIGN KEY ("billboardId") REFERENCES "Billboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
