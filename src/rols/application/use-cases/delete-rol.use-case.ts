import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IRolRepository } from "src/rols/domain/interface/irol.repository";

@Injectable()
export class DeleteRolUseCase {
    constructor(
        @Inject('RolRepository')
        private readonly rolRepository: IRolRepository
    ) {};

    async execute(id: string) {
        const exists = await this.rolRepository.findOne(id);
        if(!exists) throw new NotFoundException(`Rol with id ${id} not found`);
    
        return this.rolRepository.delete(id);
    }
}