import { HttpStatus } from '@nestjs/common';

export interface IResponse<T = null> {
  statusCode: HttpStatus;
  message: string;
  payload?: T;
}
