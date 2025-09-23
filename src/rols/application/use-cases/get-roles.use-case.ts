import { Inject, Injectable } from "@nestjs/common";
import { PaginationArgs } from "src/common/dtos/args/pagination.args";
import { SearchArgs } from "src/common/dtos/args/search.args";
import { IRolRepository } from "src/rols/domain/interface/irol.repository";

@Injectable()
export class GetRolesUseCase {
    constructor(
        @Inject('RolRepository')
        private readonly rolRepository: IRolRepository
    ) {};

    async execute(paginationArgs: PaginationArgs, searchArgs: SearchArgs) {
        return this.rolRepository.get(paginationArgs, searchArgs);
    }
}