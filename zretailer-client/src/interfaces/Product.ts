export interface Product {
    id?: string;
    title: string;
    category: string;
    desc?: string;
    pkgCap: number;
    pkgPriceBuy: number;
    pkgPriceSell: number;
    unitPrice: number;
}

export interface ProductTitle {
    id: string;
    title: string;
}
