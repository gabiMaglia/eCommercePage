-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "storeDataId" TEXT;

-- CreateTable
CREATE TABLE "ContactData" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "mercadoLibre" TEXT NOT NULL,

    CONSTRAINT "ContactData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactData_storeId_key" ON "ContactData"("storeId");

-- CreateIndex
CREATE INDEX "Stock_productId_idx" ON "Stock"("productId");

-- AddForeignKey
ALTER TABLE "ContactData" ADD CONSTRAINT "ContactData_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
