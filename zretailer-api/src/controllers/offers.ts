import { Router } from "express";
import { createOffer } from "../handlers/offers";
import { OfferToCreate } from "../interfaces/Offer";

const router = Router();

router.post("/offers", async (req, res, next) => {
    try {
        const offerToCreate: OfferToCreate = {
            percent: req.body.percent,
            fromDate: req.body.fromDate,
            untilDate: req.body.untilDate,
            productIds: req.body.productIds.map((id: number) => {
                return { id }
            }),
        }

        const offer = await createOffer(offerToCreate);
        res.json(offer);
    } catch (error) {
        next(error);
    }
});

export default router;
