import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { RequestContextService } from '../context/request-context.service';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UuidGeneratorPort } from 'src/common/domain/port/uuid-generator.port';

@Injectable()
export class GraphqlRequestContextInterceptor implements NestInterceptor {
  constructor(
    private readonly requestContextService: RequestContextService,
    @Inject('UuidGeneratorPort')
    private readonly uuidGenerator: UuidGeneratorPort,
  ) {};


  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;
    
    const request_id = request.headers['x-request-id'] ?? this.uuidGenerator.generate();
    request.headers['x-request-id'] = request_id;

    return new Observable((subscriber) => {
      this.requestContextService.run(
        request,
        () => {
          next.handle()
            .subscribe(subscriber)
        }
      )
    })
  }
}