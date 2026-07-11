import { Inject, Injectable } from '@nestjs/common';
import { LogRepositoryPort } from './domain/ports/log-repository.port';
import { RequestContextFactory } from './infrastructure/context/request-context.factory';
import { CreateLogDto } from './application/dtos/create-log.dto';
import { RequestContextService } from 'src/common/infraestructure/context/request-context.service';

@Injectable()
export class LogsService {
  constructor(
    @Inject('LogRepository')
    private readonly logRepository: LogRepositoryPort,
    private readonly requestContextFactory: RequestContextFactory,
    private readonly context: RequestContextService
  ) {};

  async log(
    dto: CreateLogDto,
    additional_data: any = null
  ) : Promise<void> {
    const request : any = this.context.getRequest();
    let httpContext = this.requestContextFactory.create(request);
    if(additional_data) {
      httpContext['metadata'] = {
        ...httpContext['metadata'],
        ...additional_data
      }
    }
    await this.logRepository.saveLog(dto, httpContext);
  }
}
