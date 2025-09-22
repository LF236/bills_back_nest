import { Inject, NotFoundException } from "@nestjs/common";
import { IPermissionRepository } from "src/permissions/domain/interface/ipermission.repository";

export class DeletePermissionUseCase{
    constructor(
        @Inject('PermissionRepository')
        private readonly permissionRepository: IPermissionRepository
    ) {};


    async execute(id: string) : Promise<boolean> {
        const permission = await this.permissionRepository.findOne(id);
        if(!permission) throw new NotFoundException(`Permission with id ${id} not found.`);
        const deleted = await this.permissionRepository.delete(id);
        if(deleted) return true;

        return false;
    }
}