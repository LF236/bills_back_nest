import { Inject, Injectable } from "@nestjs/common";
import { PaginationArgs } from "src/common/dtos/args/pagination.args";
import { SearchArgs } from "src/common/dtos/args/search.args";
import { IUserRepository } from "src/user/domain/interfaces/iuser.repository";

@Injectable()
export class FindAllUsersUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository
    ) {};

    async execute(paginationArgs: PaginationArgs, searchArgs: SearchArgs) {
        return this.userRepository.findAll(paginationArgs, searchArgs);
    }
}