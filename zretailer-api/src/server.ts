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
            title: productData.title,
            category: productData.category,
            desc: productData.desc,
            pkgCap: productData.pkgCap,
            pkgPriceBuy: productData.pkgPriceBuy,
            pkgPriceSell: productData.pkgPriceSell,
            unitPrice: productData.unitPrice
        }
    });

    res.json(product);    
});

app.get("/api/products",async (_req, res) => {
    const products = await prisma.product.findMany();
    res.json(products);
})

// Listen to requests
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
});

export default app;