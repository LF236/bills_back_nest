import { Inject, Injectable } from '@nestjs/common';
import { SingUpDto } from '../dto/singup.dto';
import { IUserRepository } from 'src/user/domain/interfaces/iuser.repository';

@Injectable()
export class SignUpUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository
  ) {};
  
  
  async execute(dto: SingUpDto) {

  }
}