/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import AppError from '../shared/error/AppError';

function globalErros(err: Error, req: Request, res: Response, next: NextFunction) {

    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            data: err?.data
        });
    }

    console.log(err);
    
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error, traduzindo deu merda'
    });
}

export { globalErros };