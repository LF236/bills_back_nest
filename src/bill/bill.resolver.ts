import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BillService } from './bill.service';
import { Bill } from './entities/bill.entity';
import { CreateBillInput } from './dto/create-bill.input';
import { UpdateBillInput } from './dto/update-bill.input';

@Resolver(() => Bill)
export class BillResolver {
  constructor(private readonly billService: BillService) {}

  @Mutation(() => Bill)
  createBill(@Args('createBillInput') createBillInput: CreateBillInput) {
    return this.billService.create(createBillInput);
  }

  @Query(() => [Bill], { name: 'bill' })
  findAll() {
    return this.billService.findAll();
  }

  @Query(() => Bill, { name: 'bill' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.billService.findOne(id);
  }

  @Mutation(() => Bill)
  updateBill(@Args('updateBillInput') updateBillInput: UpdateBillInput) {
    return this.billService.update(updateBillInput.id, updateBillInput);
  }

  @Mutation(() => Bill)
  removeBill(@Args('id', { type: () => Int }) id: number) {
    return this.billService.remove(id);
  }
}
