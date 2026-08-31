import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ApplicationException } from './application.exception';
import { GraphQLError } from 'graphql';

@Catch(ApplicationException)
export class ApplicationExceptionFilter implements ExceptionFilter {
  catch(exception: ApplicationException, host: ArgumentsHost) {
    const type = host.getType<string>();
    if( type === 'http' ) {
      const response = host.switchToHttp().getResponse();
      return response
        .status(this.getHttpStatus(exception))
        .json({
          message: exception.message,
          code: exception.code
        })
    }

    if(type === 'graphql') {
      return new GraphQLError(exception.message, {
        extensions: {
          code: exception.code
        }
      });
    }

    throw exception;
  }

  private getHttpStatus(exception: ApplicationException) : number {
    switch (exception.code) {
      case 'CONFLICT':
        return 409;
      case 'NOT_FOUND':
        return 404;
      case 'UNAUTHENTICATED':
        return 401;
      case 'FORBIDDEN':
        return 403;
      case 'BAD_USER_INPUT':
        return 422;
      case 'INVALID_STATE':
        return 409;
      case 'SERVICE_UNAVAILABLE':
        return 503;
      default:
        return 500;
    }
  }
}