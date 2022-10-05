import { body } from "express-validator";

export const postOffers = [
    body("percent").isString(),
    body("fromDate").isDate(),
    body("untilDate").isDate(),
    body("productIds")
        .exists()
        .custom((value) => {
            if (!value.every(Number.isInteger))
                throw new Error("Array doesn't contain Integers");
            return true;
        }),
];
