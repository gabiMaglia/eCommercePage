/*
  Warnings:

  - Changed the type of `stock` on the `Color` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Color" DROP COLUMN "stock",
ADD COLUMN     "stock" INTEGER NOT NULL;
