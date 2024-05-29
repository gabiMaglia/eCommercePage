/*
  Warnings:

  - Made the column `aboutUs` on table `ContactData` required. This step will fail if there are existing NULL values in that column.
  - Made the column `storeHours` on table `ContactData` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ContactData" ALTER COLUMN "aboutUs" SET NOT NULL,
ALTER COLUMN "aboutUs" DROP DEFAULT,
ALTER COLUMN "storeHours" SET NOT NULL,
ALTER COLUMN "storeHours" DROP DEFAULT;
