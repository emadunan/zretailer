import { ProductTitle } from "./Product";

export interface Offer {
    id: number;
    percent: number;
    formDate: Date;
    untilDate: Date;
    products: ProductTitle[];
}
