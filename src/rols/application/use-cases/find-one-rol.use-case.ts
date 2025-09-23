import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IRolRepository } from "src/rols/domain/interface/irol.repository";

@Injectable()
export class FindOneRolUseCase {
    constructor(
        @Inject('RolRepository')
        private readonly rolRepository: IRolRepository
    ) {};


    async execute(id: string) {
        const rol = await this.rolRepository.findOne(id);
        if(!rol) throw new NotFoundException(`Rol with id ${id} not found`);
        return rol;
    }
}