import { ErrorRequestHandler } from "express";
import { ErrorResponse } from "../utils/error.utils";

const errorHandler: ErrorRequestHandler = (
    err,
    req,
    res,
    next
): void => { 
    res.setHeader("Content-Type", "application/json"); 

    if (err instanceof ErrorResponse) {
        res.status(err.statusCode).json(err.data);
        return;
    }

    console.error("Unhandled Error:", err);
    res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
        error: "Something went wrong"
    });
};

export default errorHandler;
