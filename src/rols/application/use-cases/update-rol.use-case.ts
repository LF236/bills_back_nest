import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { IRolRepository } from "src/rols/domain/interface/irol.repository";
import { UpdateRolInput } from "src/rols/dto/update-rol.input";
import { IPermissionRepository } from '../../../permissions/domain/interface/ipermission.repository';
import { User } from "src/user/domain/entities/user.entity";
import { LogsService } from "src/logs/logs.service";
import { Timer } from "src/common/domain/timing/timer";
@Injectable()
export class UpdateRolUseCase {
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
 			action: 'Update Rol',
			module: 'rols',
			resource: 'UpdateRolUseCase',
			description: 'Update rol',
			result: 'success',
			duration: duration, 
        }, { ...payload })
    }

    async execute(updateRolInput: UpdateRolInput, user: User) {
        const timer = Timer.create();
        const findById = await this.rolRepository.findOne(updateRolInput.id);
        if(!findById) throw new BadRequestException(`The rol with id ${updateRolInput.id} does not exist in the system`);

        if(updateRolInput.name) {
            const findByName = await this.rolRepository.findByName(updateRolInput.name);
            if(findByName?.getId() !== updateRolInput.id && findByName) throw new BadRequestException(`The rol with name ${updateRolInput.name} already exists in the system`);            
        }

        if(updateRolInput.permissions && updateRolInput.permissions.length > 0) {
            const permissionsFromDb = await this.permissionRepository.findByIds(updateRolInput.permissions);
            if(permissionsFromDb.length !== updateRolInput.permissions.length) {
                throw new BadRequestException("One or more permissions do not exist, please check the IDs");
            }
        }

        const updatedRol = await this.rolRepository.update(updateRolInput);
        await this.saveLog(user.id, user.getUserName(), timer.stop(), updateRolInput);
        return updatedRol;
    }
}