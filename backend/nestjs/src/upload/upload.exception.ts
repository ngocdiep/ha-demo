import { HttpException, HttpStatus } from '@nestjs/common';

export class UploadException extends HttpException {
    constructor(error: any) {
        super(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
