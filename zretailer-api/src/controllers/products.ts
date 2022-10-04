import { Router } from "express";
import prisma from "../client";

import { createProduct, findProducts } from "../handlers/products";

const router = Router();

router.post("/products", async (req, res, next) => {
    try {
        const productToCreate = {
            title: req.body.title,
            category: req.body.category,
            desc: req.body.desc,
            pkgCap: req.body.pkgCap,
            pkgPriceBuy: req.body.pkgPriceBuy,
            pkgPriceSell: req.body.pkgPriceSell,
            unitPrice: req.body.unitPrice
        };

        const product = await createProduct(productToCreate);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

router.get("/products", async (req, res, next) => {
    try {
        const pageNumbr = +<string>req.query.page || 1;
        const pageSize = +<string>req.query.size || 4;

        const paginatedProducts = await findProducts(pageNumbr, pageSize);
        res.json(paginatedProducts);
    } catch (error) {
        next();
    }
});

export default router;