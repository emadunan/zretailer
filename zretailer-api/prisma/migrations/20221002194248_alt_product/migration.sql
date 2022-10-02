/*
  Warnings:

  - Made the column `pkgCap` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "pkgCap" SET NOT NULL,
ALTER COLUMN "title" SET NOT NULL;
