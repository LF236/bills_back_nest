import { Injectable } from '@nestjs/common';
import { CreateBillInput } from './dto/create-bill.input';
import { UpdateBillInput } from './dto/update-bill.input';

@Injectable()
export class BillService {
  create(createBillInput: CreateBillInput) {
    return 'This action adds a new bill';
  }

  findAll() {
    return `This action returns all bill`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bill`;
  }

  update(id: number, updateBillInput: UpdateBillInput) {
    return `This action updates a #${id} bill`;
  }

  remove(id: number) {
    return `This action removes a #${id} bill`;
  }
}
