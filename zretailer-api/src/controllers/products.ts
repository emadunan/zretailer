import { NextFunction, Request, Response, Router } from "express";
import multer from "multer";
import { validationResult } from "express-validator";
import {
    createProduct,
    findProducts,
    getOneProduct,
    getProductTitles,
    updateProductPhoto,
} from "../handlers/products";

import * as Validations from "../validations/products";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.get(
    "/products",
    Validations.getProducts,
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
            const pageNumbr = +(<string>req.query.page) || 1;
            const pageSize = +(<string>req.query.size) || 4;

            // Fetch data from database and return it in reponse body
            const paginatedProducts = await findProducts(pageNumbr, pageSize);
            res.json(paginatedProducts);
        } catch (error) {
            next();
        }
    }
);

router.get(
    "/products/:productId",
    Validations.getOneProduct,
    async (req: Request, res: Response, next: NextFunction) => {
        // Validate Request
        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty())
            return res.status(400).json({
                errMessage: "ValidationError",
                errors: validationErrors.array(),
            });

        const productId = +req.params.productId;

        try {
            const product = await getOneProduct(productId);
            res.json(product);
        } catch (error) {
            next();
        }
    }
);

router.get(
    "/product-titles",
    async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const productTitles = await getProductTitles();
            res.json(productTitles);
        } catch (error) {
            next();
        }
    }
);

router.post(
    "/products",
    Validations.postProducts,
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
            const productToCreate = {
                title: req.body.title,
                category: req.body.category,
                desc: req.body.desc,
                pkgCap: req.body.pkgCap,
                pkgPriceBuy: req.body.pkgPriceBuy,
                pkgPriceSell: req.body.pkgPriceSell,
                unitPrice: req.body.unitPrice,
            };

            // Save record in database and return it in response body
            const product = await createProduct(productToCreate);

            // Respond with 200 OK
            res.json(product);
        } catch (error) {
            next(error);
        }
    }
);

router.post(
    "/products/upload/product-photo",
    upload.single("file"),
    async (req: Request, res: Response, next: NextFunction) => {
        const productId = +req.body.productId;
        const productPhoto = req.file?.filename;

        if (!productPhoto) return;

        try {
            const prod = await updateProductPhoto(productId, productPhoto);
            res.json(prod);
        } catch (error) {
            next();
        }
    }
);

export default router;
