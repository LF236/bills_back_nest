import { CreateLogDto } from 'src/logs/application/dtos/create-log.dto';
import { LogEntity } from '../entities/LogEntity';
import { PaginationArgs } from 'src/common/application/dto/args/pagination.args';
import { SearchArgs } from 'src/common/dtos/args/search.args';
import { CatalogLogTypes } from 'src/common/domain/enums/catalog-log-types.enum';
import { GetLogsFiltersArgs } from 'src/logs/application/dtos/args/get-logs-filters.args';

export interface LogRepositoryPort {
  findById(id: string) : Promise<LogEntity | null>;
  findAll(paginationDto: PaginationArgs, searchArgs: SearchArgs, aditionalFilters: GetLogsFiltersArgs) : Promise<LogEntity[]>;
  saveLog(dto: CreateLogDto, addionalData: any) : Promise<LogEntity>;
  count(searchArgs: SearchArgs, aditionalFilters: GetLogsFiltersArgs) : Promise<number>;
  getCatalog(type: CatalogLogTypes) : Promise<String[]>;
}