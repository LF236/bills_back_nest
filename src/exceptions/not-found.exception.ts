// 404
import { ApplicationException } from './application.exception';

export class NotFoundException extends ApplicationException {
  constructor(message: string) {
    super(message, 'NOT_FOUND');
  }
}