import { Inject, Injectable } from "@nestjs/common";
import { IPermissionRepository } from "src/permissions/domain/interface/ipermission.repository";
import { UpdatePermissionInput } from "../dto/inputs/update-permission.input";
import { LogsService } from "src/logs/logs.service";
import { User } from "src/user/domain/entities/user.entity";
import { Timer } from "src/common/domain/timing/timer";

@Injectable()
export class UpdatePermissionUseCase {
    constructor(
        @Inject('PermissionRepository')
        private readonly permissionRepository: IPermissionRepository,
        private readonly logsService: LogsService
    ) {};

    async saveLog(user_id: string, user_name: string, duration: number = 0, payload: any) {
        await this.logsService.log({
            user_id: user_id,
            user_name: user_name,
            action: 'Update Permission',
            module: 'permission',
            resource: 'UpdatePermissionUseCase',
            description: 'Update Permission',
            result: 'success',
            duration: duration
        }, {
            ...payload
        })
    }

    async execute(updatePermissionInput: UpdatePermissionInput, user: User) {
        const timer = Timer.create();
        const exists = await this.permissionRepository.findOne(updatePermissionInput.id);
        if(!exists) throw new Error(`Permission with id ${updatePermissionInput.id} is not found`);

        if(updatePermissionInput.name) {
            const findByName = await this.permissionRepository.findByName(`${updatePermissionInput.name.trim()}`);
            if(findByName?.getId() !== updatePermissionInput.id && findByName) {
                throw new Error(`Permission with name ${updatePermissionInput.name} already exists`);
            }
        }   

        const updated = await this.permissionRepository.update(updatePermissionInput.id, updatePermissionInput);
        await this.saveLog(user.id, user.getUserName(), timer.stop(), updatePermissionInput);
        return updated?.getGraphQLType() ?? null;
    }
}