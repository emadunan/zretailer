import { Product } from "@prisma/client";
import prisma from "../client";

import { ProductToCreate } from "../interfaces/Product";

export async function createProduct(prod: ProductToCreate) {
    return await prisma.product.create({ data: prod });
}

export async function findProducts(pageNumbr: number, pageSize: number) {
    const skipRecords = (pageNumbr - 1) * pageSize;

    const total = await prisma.product.count();
    const products = await prisma.product.findMany({
        skip: skipRecords,
        take: pageSize,
        orderBy: { id: "desc" },
    });

    const pages = Math.ceil(total / pageSize);

    return { pageSize, pages, products };
}

export async function getOneProduct(id: number) {
    return await prisma.product.findUnique({
        where: {
            id,
        },
    });
}

export async function getProductTitles() {
    return await prisma.product.findMany({
        select: {
            id: true,
            title: true,
        },
    });
}

export async function updateProductData(product: Product) {
    return await prisma.product.update({
        where: {
            id: product.id,
        },
        data: {
            title: product.title,
            category: product.category,
            desc: product.desc,
            pkgCap: product.pkgCap,
            pkgPriceBuy: product.pkgPriceBuy,
            pkgPriceSell: product.pkgPriceSell,
            unitPrice: product.unitPrice
        }
    })
}

export async function updateProductPhoto(productId: number, fileName: string) {
    return await prisma.product.update({
        where: {
            id: productId,
        },
        data: {
            photo: fileName,
        },
    });
}
