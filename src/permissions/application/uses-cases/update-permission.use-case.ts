import { Inject, Injectable } from "@nestjs/common";
import { IPermissionRepository } from "src/permissions/domain/interface/ipermission.repository";
import { UpdatePermissionInput } from "../dto/inputs/update-permission.input";

@Injectable()
export class UpdatePermissionUseCase {
    constructor(
        @Inject('PermissionRepository')
        private readonly permissionRepository: IPermissionRepository
    ) {};

    async execute(updatePermissionInput: UpdatePermissionInput) {
        const exists = await this.permissionRepository.findOne(updatePermissionInput.id);
        if(!exists) throw new Error(`Permission with id ${updatePermissionInput.id} is not found`);

        if(updatePermissionInput.name) {
            const findByName = await this.permissionRepository.findByName(`${updatePermissionInput.name.trim()}`);
            if(findByName?.getId() !== updatePermissionInput.id && findByName) {
                throw new Error(`Permission with name ${updatePermissionInput.name} already exists`);
            }
        }   

        const updated = await this.permissionRepository.update(updatePermissionInput.id, updatePermissionInput);
        return updated?.getGraphQLType() ?? null;
    }
}