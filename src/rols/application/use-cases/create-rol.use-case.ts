import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { IRolRepository } from "src/rols/domain/interface/irol.repository";
import { CreateRolInput } from "../dto/inputs/create-rol.input";
import { IPermissionRepository } from "src/permissions/domain/interface/ipermission.repository";

@Injectable()
export class CreateRolUseCase {
    constructor(
        @Inject('RolRepository')
        private readonly rolRepository: IRolRepository,
        @Inject('PermissionRepository')
        private readonly permissionRepository: IPermissionRepository
    ) {};



    async execute(createRolInput: CreateRolInput) {
        const { permissions = [] } = createRolInput;

        if(permissions.length > 0) {
            const permissionsFromDb = await this.permissionRepository.findByIds(permissions);
            if(permissionsFromDb.length !== permissions.length) {
                throw new BadRequestException("One or more permissions do not exist, please check the IDs");
            }
        }

        
        return await this.rolRepository.create(createRolInput);

    }
}