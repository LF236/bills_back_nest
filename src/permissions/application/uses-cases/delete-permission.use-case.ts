import { Inject, NotFoundException } from "@nestjs/common";
import { Timer } from "src/common/domain/timing/timer";
import { LogsService } from "src/logs/logs.service";
import { IPermissionRepository } from "src/permissions/domain/interface/ipermission.repository";
import { User } from "src/user/domain/entities/user.entity";

export class DeletePermissionUseCase{
    constructor(
        @Inject('PermissionRepository')
        private readonly permissionRepository: IPermissionRepository,
        private readonly logsService: LogsService
    ) {};

    async saveLog(user_id: string, user_name: string, duration: number = 0, id: string) {
        await this.logsService.log({
            user_id: user_id,
            user_name: user_name,
            action: 'Delete Permission',
            module: 'permission',
            resource: 'DeletePermissionUseCase',
            description: 'Delete Permission',
            result: 'success',
            duration: duration
        }, { id });
    }

    async execute(id: string, user: User) : Promise<boolean> {
        const timer = Timer.create();
        const permission = await this.permissionRepository.findOne(id);
        if(!permission) throw new NotFoundException(`Permission with id ${id} not found.`);
        const deleted = await this.permissionRepository.delete(id);
        await this.saveLog(user.id, user.getUserName(), timer.stop(), id);
        if(deleted) return true;
        return false;
    }
}