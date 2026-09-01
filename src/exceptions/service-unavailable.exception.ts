// 503
import { ApplicationException } from './application.exception';

export class ServiceUnavailableException extends ApplicationException {
  constructor(message: string) {
    super(message, 'SERVICE_UNAVAILABLE');
  }
}