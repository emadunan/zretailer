import { body } from "express-validator";

export const postProductsValidation = [
    body("title").isString(),
    body("category").isString(),
    body("desc").isString().optional(),
    body("pkgCap").isNumeric(),
    body("pkgPriceBuy").isNumeric(),
    body("pkgPriceSell").isNumeric(),
    body("unitPrice").isNumeric(),
];