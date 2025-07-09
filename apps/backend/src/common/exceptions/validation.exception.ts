import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(message: string | string[]) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Validation Error',
        message: Array.isArray(message) ? message : [message],
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
