import { Product } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { validationResult } from "express-validator";
import { createOffer, getAllOffers } from "../handlers/offers";
import { OfferToCreate } from "../interfaces/Offer";
import * as Validations from "../validations/offers";

const router = Router();

// Fetch all offers
router.get("/offers", async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const offers = await getAllOffers();
        res.json(offers);
    } catch (error) {
        next();
    }
});

// Create offer
router.post(
    "/offers",
    Validations.postOffers,
    async (req: Request, res: Response, next: NextFunction) => {
        // Validate Request        
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty())
        
            return res.status(400).json({
                errMessage: "ValidationError",
                errors: validationErrors.array(),
            });

        try {
            // Extract data from the request body
            const offerToCreate: OfferToCreate = {
                percent: req.body.percent,
                fromDate: req.body.fromDate,
                untilDate: req.body.untilDate,
                productIds: req.body.products.map((prod: Partial<Product>) => {
                    return {id: prod.id};
                }),
            };            

            // Save record in database and return it in response body
            const offer = await createOffer(offerToCreate);
            res.json(offer);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
