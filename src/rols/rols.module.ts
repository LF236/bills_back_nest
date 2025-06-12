import { Module } from '@nestjs/common';
import { RolsService } from './rols.service';
import { RolsResolver } from './rols.resolver';

@Module({
  providers: [RolsResolver, RolsService],
})
export class RolsModule {}
