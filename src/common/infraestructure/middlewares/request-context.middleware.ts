import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { RequestContextService } from '../context/request-context.service';
import { NextFunction, Request, Response } from 'express';
import { UuidGeneratorPort } from 'src/common/domain/port/uuid-generator.port';
@Injectable()
export class RequesContextMiddleware implements NestMiddleware {
  constructor(
    private readonly context: RequestContextService,
    @Inject('UuidGeneratorPort')
    private readonly uuidGenerator: UuidGeneratorPort,
  ) {};

  use(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if(!req.headers['x-request-id']) {
      req.headers['x-request-id'] = this.uuidGenerator.generate();
    }

    this.context.run(req, next);
  }
}