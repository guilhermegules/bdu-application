import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(message: string, httpStatus = HttpStatus.BAD_REQUEST) {
    super(message, httpStatus);
  }
}
