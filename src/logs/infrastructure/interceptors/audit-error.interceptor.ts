import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { catchError, Observable, throwError } from "rxjs";
import { LogsService } from "src/logs/logs.service";
import { AUDIT_KEY, AuditMetadata } from "../decorators/audit.decorator";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class AuditErrorInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly logService: LogsService
  ) {};

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const audit = this.reflector.getAllAndOverride<AuditMetadata>(
      AUDIT_KEY,
      [
        context.getHandler(),
        context.getClass()
      ]
    );

    if(!audit) {
      return next.handle();
    }

    const request = 
      context.getType<'http' | 'graphql'>() === 'http'
        ? context.switchToHttp().getRequest()
        : GqlExecutionContext.create(context).getContext().req;

        
    return next.handle().pipe(
      catchError((error) => {
        void this.logService.log({
          user_id: request.user?.id ?? null,
          user_name: 
            request.user?.email ?? request.body?.email ?? 'Anonymous',
          action: audit.action,
          module: audit.module,
          resource: audit.resource,
          description: audit.description,
          result: 'error',
          message_error: error.message,
        }, { metadata: request.body });

        return throwError(() => error);
      })
    );
  }
}