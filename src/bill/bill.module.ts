import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillResolver } from './bill.resolver';

@Module({
  providers: [BillResolver, BillService],
})
export class BillModule {}
