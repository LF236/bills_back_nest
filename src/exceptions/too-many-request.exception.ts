// 429
import { ApplicationException } from './application.exception';

export class TooManyRequestsException extends ApplicationException {
  constructor(message: string) {
    super(message, 'TOO_MANY_REQUESTS');
  }
}