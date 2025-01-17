// src/utils/error.handler.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorHandler extends Error {
    constructor({
        type,
        message,
    }: {
        type: keyof typeof HttpStatus;
        message: string;
    }) {
        super(`${type} :: ${message}`);
    }

    public static handleServiceError(error: any): never {
        const { message } = error;
        const type = message.split(' :: ')[0] as keyof typeof HttpStatus;
        const httpStatus = HttpStatus[type] || HttpStatus.INTERNAL_SERVER_ERROR;

        throw new HttpException(message, httpStatus);
    }
}
