import { Injectable } from '@nestjs/common';
import { User } from 'src/user/domain/entities/user.entity';

@Injectable()
export class GetMeUseCase {
  constructor() {};

  async execute(user: User) {
    return user.getGraphQLType();
  }
}