export interface Product {
    id?: number;
    title: string;
    category: string;
    desc?: string;
    pkgCap: number;
    pkgPriceBuy: number;
    pkgPriceSell: number;
    unitPrice: number;
    photo?: string;
}

export interface ProductTitle {
    id: number;
    title: string;
}
