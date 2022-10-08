import { body } from "express-validator";

export const postOffers = [
    body("percent").isNumeric(),
    body("fromDate").isString(),
    body("untilDate").isString(),
    body("products").exists(),
];
