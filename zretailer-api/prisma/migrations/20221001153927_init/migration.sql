-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "desc" TEXT,
    "pkgCapacity" INTEGER NOT NULL,
    "pkgPriceBuy" INTEGER NOT NULL,
    "pkgPriceSell" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
