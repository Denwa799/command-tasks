import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ValidationException extends HttpException {
  messages;

  constructor(response) {
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
