import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import productsRouter from "./controllers/products";
import offersRouter from "./controllers/offers";
import { errorHandler, pageNotFoundHandler } from "./controllers/error";

// Extract environment variables
dotenv.config();
const { PORT } = process.env;

// Initialize express web server
const app = express();

// Configure Middleware
app.use(cors());
app.use(bodyParser.json());

// Register Controllers Routes
app.use("/api", productsRouter);
app.use("/api", offersRouter);

// Handle Errors
app.use(pageNotFoundHandler);
app.use(errorHandler);

// Listen to requests
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
});

export default app;
