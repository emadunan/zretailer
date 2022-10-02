/*
  Warnings:

  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `pkgCapacity` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "name",
DROP COLUMN "pkgCapacity",
ADD COLUMN     "pkgCap" INTEGER,
ADD COLUMN     "title" TEXT;
