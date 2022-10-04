import { NextFunction, Request, RequestHandler, Response } from "express";

export const errorHandler = (
    err: Error, _req: Request, res: Response, _next: NextFunction) => {      
        res.json({
            errMessage: err.message
        });
};

export const pageNotFoundHandler: RequestHandler = (_req, res) => {
    res.status(404).json({
        errMessage: "the page that you were looking for doesn't exist",
    });
};
