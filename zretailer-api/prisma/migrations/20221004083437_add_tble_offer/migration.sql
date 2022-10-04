-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "percent" INTEGER NOT NULL,
    "fromDate" TIMESTAMP(3) NOT NULL,
    "untilDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OfferToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OfferToProduct_AB_unique" ON "_OfferToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_OfferToProduct_B_index" ON "_OfferToProduct"("B");

-- AddForeignKey
ALTER TABLE "_OfferToProduct" ADD CONSTRAINT "_OfferToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OfferToProduct" ADD CONSTRAINT "_OfferToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
