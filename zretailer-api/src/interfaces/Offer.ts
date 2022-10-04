import { Product } from "@prisma/client";

export interface OfferToCreate {
    percent: number;
    fromDate: Date;
    untilDate: Date;
    productIds: {id: number}[];
}