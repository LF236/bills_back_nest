import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { IRolRepository } from "src/rols/domain/interface/irol.repository";
import { CreateRolInput } from "../dto/inputs/create-rol.input";
import { IPermissionRepository } from "src/permissions/domain/interface/ipermission.repository";
import { LogsService } from "src/logs/logs.service";
import { Timer } from "src/common/domain/timing/timer";
import { User } from "src/user/domain/entities/user.entity";

@Injectable()
export class CreateRolUseCase {
    constructor(
        @Inject('RolRepository')
        private readonly rolRepository: IRolRepository,
        @Inject('PermissionRepository')
        private readonly permissionRepository: IPermissionRepository,
        private readonly logsService: LogsService
    ) {};

    async saveLog(user_id: string, user_name: string, duration: number = 0, payload: any) {
        await this.logsService.log({
            user_id,
            user_name,
 			action: 'Create Rol',
			module: 'rols',
			resource: 'CreateRolUseCase',
			description: 'Create new rol',
			result: 'success',
			duration: duration,           
        }, { ...payload });
    }

    async execute(createRolInput: CreateRolInput, user: User) {
        const timer = Timer.create();
        const { permissions = [] } = createRolInput;

        if(permissions.length > 0) {
            const permissionsFromDb = await this.permissionRepository.findByIds(permissions);
            if(permissionsFromDb.length !== permissions.length) {
                throw new BadRequestException("One or more permissions do not exist, please check the IDs");
            }
        }

        const rolAlreadyExists = await this.rolRepository.validateIfRolExistsByName(createRolInput.name);
        if(rolAlreadyExists) {
            throw new BadRequestException(`The rol with name ${createRolInput.name} already exists in the system`);
        }
        await this.saveLog(user.id, user.getUserName(), timer.stop(), createRolInput);
        return await this.rolRepository.create(createRolInput);
    }
}