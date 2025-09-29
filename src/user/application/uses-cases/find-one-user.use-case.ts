import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IUserRepository } from "src/user/domain/interfaces/iuser.repository";

@Injectable()
export class FindOneUserUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository
    ) {};

    async execute(id: string) {
        const user = await this.userRepository.findById(id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }
}