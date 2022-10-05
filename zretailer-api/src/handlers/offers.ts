import prisma from "../client";

import { OfferToCreate } from "../interfaces/Offer";

export async function createOffer(obj: OfferToCreate) {
    return await prisma.offer.create({
        data: {
            percent: obj.percent,
            fromDate: new Date(obj.fromDate),
            untilDate: new Date(obj.untilDate),
            products: {
                connect: obj.productIds,
            },
        },
        include: {
            products: true,
        },
    });
}
