import { CreateLogDto } from 'src/logs/application/dtos/create-log.dto';
import { LogEntity } from '../entities/LogEntity';

export interface LogRepositoryPort {
  findById(id: string) : Promise<LogEntity | null>;
  saveLog(dto: CreateLogDto, addionalData: any) : Promise<LogEntity>;
}