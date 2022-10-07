export interface OfferToCreate {
    percent: number;
    fromDate: Date;
    untilDate: Date;
    productIds: { id: number }[];
}
