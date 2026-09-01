// 422
import { ApplicationException } from './application.exception';

export class ValidationException extends ApplicationException {
  constructor(message: string) {
    super(message, 'BAD_USER_INPUT');
  }
}