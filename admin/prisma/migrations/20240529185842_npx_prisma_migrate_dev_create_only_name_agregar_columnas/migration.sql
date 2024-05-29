/*
  Warnings:

  - Added the required column `aboutUs` to the `ContactData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeHours` to the `ContactData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactData" ADD COLUMN     "aboutUs" TEXT  DEFAULT '',
ADD COLUMN     "storeHours" TEXT DEFAULT '' ;  
