/*
  Warnings:

  - Added the required column `unitPrice` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "unitPrice" INTEGER NOT NULL;
