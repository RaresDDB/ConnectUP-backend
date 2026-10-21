import { ErrorRequestHandler } from 'express';
import { ErrorResponsePayload } from "../responses/error-response-payload";
import {
    JsonWebTokenError,
    TokenExpiredError
} from "jsonwebtoken";
import {
    Request,
    Response,
    NextFunction,
} from "express";

export interface CustomError extends Error {
    statusCode?: number;
}

const errorMiddleware: ErrorRequestHandler = (err: CustomError, req: Request, res: Response, _next: NextFunction) => {
    console.error("Error details:", {
        name: err.name,
        message: err.message,
        url: req.originalUrl,
        method: req.method,
        stack: err.stack
    });

    if (err instanceof TokenExpiredError) {
        res.status(401).json(
            new ErrorResponsePayload('Token has expired!')
        );
        return;
    }

    if (err instanceof JsonWebTokenError) {
        res.status(401).json(
            new ErrorResponsePayload('Invalid token')
        );
        return;
    }

    const statusCode = err.statusCode || 500;
    const message = err.message || 'An unexpected error occurred';

    res.status(statusCode).json(
        new ErrorResponsePayload(message)
    );
};

export default errorMiddleware;