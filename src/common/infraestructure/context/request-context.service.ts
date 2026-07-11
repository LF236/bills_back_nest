import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { Request } from 'express';

@Injectable()
export class RequestContextService {
  private readonly storage = new AsyncLocalStorage<Request>();

  run(request: Request, callback: () => void) {
    this.storage.run(request, callback);
  }

  getRequest() : Request | undefined {
    return this.storage.getStore();
  }
}