// 403
import { ApplicationException } from './application.exception';

export class ForbiddenException extends ApplicationException {
  constructor(message: string) {
    super(message, 'FORBIDDEN');
  }
}