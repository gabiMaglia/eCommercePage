/*
  Warnings:

  - Added the required column `country` to the `ContactData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `ContactData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `ContactData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactData" ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
