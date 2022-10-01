import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import prisma from "./client";

// Extract environment variables
dotenv.config();
const { PORT } = process.env;

// Initialize express web server
const app = express();

// Configure Middleware
app.use(cors());
app.use(bodyParser.json());

//
app.post("/api/products", async (req, res) => {
    const productData= req.body;

    const product = await prisma.product.create({
        data: {
            name: productData.name,
            category: productData.category,
            desc: productData.desc,
            pkgCapacity: productData.pkgCapacity,
            pkgPriceBuy: productData.pkgPriceBuy,
            pkgPriceSell: productData.pkgPriceSell,
            unitPrice: productData.unitPrice
        }
    });

    console.log(product);
    res.json(product);
    
});

// Listen to requests
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
});

export default app;