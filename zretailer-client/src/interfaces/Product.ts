export interface Product {
    id?: string;
    title: string;
    category: string;
    desc?: string;
    pkgCap: number;
    pkgPriceBuy: number;
    pkgPriceSell: number;
    unitPrice: number;
    photo?: File;
}

export interface ProductTitle {
    id: number;
    title: string;
}
