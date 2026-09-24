import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { GetLogsGraphQL } from "./interface/get-logs.graphql-type";
import { GplAuthDecorator } from "src/auth/infraestructure/decorators/gpl-auth.decorator";
import { Audit } from "./infrastructure/decorators/audit.decorator";
import { GetUserDecorator } from "src/auth/infraestructure/decorators/get-user.decorator";
import { User } from "src/user/domain/entities/user.entity";
import { GetLogsUseCase } from "./application/use-cases/get-logs.use-case";
import { PaginationArgs } from "src/common/application/dto/args/pagination.args";
import { SearchArgs } from "src/common/application/dto/args/search.args";
import { GetCatalogGraphQL } from "./interface/get-catalog.graphql-type";
import { GetCatalogLogsArgs } from "./application/dtos/args/get-catalogs-log.args";
import { GetCatalogLogUseCase } from "./application/use-cases/get-catalog-log.use-case";
import { GetLogsFiltersArgs } from "./application/dtos/args/get-logs-filters.args";
import { LogGraphqlType } from "./interface/log.graphql-type";
import { ParseUUIDPipe } from "@nestjs/common";
import { GetLogUseCase } from "./application/use-cases/get-log.use-case";

@Resolver()
export class LogsResolver {
  constructor(
    private readonly getLogsUseCase: GetLogsUseCase,
    private readonly getCatalogUseCase: GetCatalogLogUseCase,
    private readonly getLogUseCase: GetLogUseCase
  ) {};
  
  @Query(() => GetLogsGraphQL, { name: 'logs' })
  @GplAuthDecorator('admin', 'default_user')
  @Audit({
    module: 'logs',
    action: 'Get Logs',
    resource: 'LogsResolver',
    description: 'Admin get logs'
  })
  async findAll(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
    @Args() searchLogsArgs: GetLogsFiltersArgs,
    @GetUserDecorator() user: User
  ) {
    const { items, total } = await this.getLogsUseCase.execute(paginationArgs, searchArgs, searchLogsArgs, user);
    return {
      items: items,
      total: total
    }
  }

  @Query(() => LogGraphqlType, { name: 'log' })
  @GplAuthDecorator('admin', 'default_user')
  @Audit({
    module: 'logs',
    action: 'Get Log',
    resource: 'LogsResolver',
    description: 'Admin get one log information'
  })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe ) id: string,
    @GetUserDecorator() user: User
  ) {
    return this.getLogUseCase.execute(id, user);
  }

  @Query(() => GetCatalogGraphQL, { name: 'calogs' } )
  @GplAuthDecorator('admin', 'default_user')
  @Audit({
    module: 'logs',
    action: 'Get Catalog',
    resource: 'LogsResolver',
    description: 'Admin Get Catalog Of Logs'
  })
  async getCatalog(
    @Args() catalogArgs: GetCatalogLogsArgs,
    @GetUserDecorator() user: User
  ) {
    return this.getCatalogUseCase.execute(catalogArgs, user);
  }
}