import { ArgsType, Field } from '@nestjs/graphql';
import { CatalogLogTypes } from 'src/common/domain/enums/catalog-log-types.enum';

@ArgsType()
export class GetCatalogLogsArgs {
  @Field(() => CatalogLogTypes, { nullable: false })
  type: CatalogLogTypes;
}