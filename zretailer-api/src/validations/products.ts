import { body, query, param } from "express-validator";

export const getProducts = [
    query("page").isNumeric(),
    query("size").isNumeric(),
];

export const getOneProduct = [param("productId").isNumeric()];

export const postProducts = [
    body("title").isString(),
    body("category").isString(),
    body("desc").isString().optional(),
    body("pkgCap").isNumeric(),
    body("pkgPriceBuy").isNumeric(),
    body("pkgPriceSell").isNumeric(),
    body("unitPrice").isNumeric(),
];
