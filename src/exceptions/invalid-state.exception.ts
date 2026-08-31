// 409
import { ApplicationException } from './application.exception';

export class InvalidStateException extends ApplicationException {
  constructor(messge: string) {
    super(messge, 'INVALID_STATE');
  }
}