import type { NextFunction, Request, Response } from 'express';
import { AppError } from './AppError.ts';
import { logger } from '../config/index.ts';

const ErrorHandler = (err: AppError, req: Request, res: Response, _next: NextFunction) => {
    err.statusCode = err.statusCode ?? 500;
    err.status = err.status ?? 'error';
    logger.error(err);
    if (process.env.NODE_ENV === 'development') {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack
        });
    } else {
        res.status(500).json({
            error: true,
            message: 'Something went wrong'
        });
    }
};

export { ErrorHandler };