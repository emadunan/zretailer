import { ProductTitle } from "./Product";

export interface Offer {
    id: number;
    percent: number;
    fromDate: Date;
    untilDate: Date;
    products: ProductTitle[];
}
