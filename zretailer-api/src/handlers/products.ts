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
