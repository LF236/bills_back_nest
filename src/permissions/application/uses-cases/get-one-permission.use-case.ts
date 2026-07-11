import { Injectable, Inject, NotImplementedException, NotFoundException } from '@nestjs/common';
import { Timer } from 'src/common/domain/timing/timer';
import { LogsService } from 'src/logs/logs.service';
import { IPermissionRepository } from 'src/permissions/domain/interface/ipermission.repository';
import { User } from 'src/user/domain/entities/user.entity';

@Injectable()
export class GetOnePermissionUseCase {
    constructor(
        @Inject('PermissionRepository')
        private readonly permissionRepository: IPermissionRepository,
        private readonly logsService: LogsService   
    ) {};

    async saveLog(user_id: string, user_name: string, duration: number = 0, token: string) {
        await this.logsService.log({
            user_id: user_id,
            user_name: user_name,
            action: 'Get One Permission',
            module: 'permission',
            resource: 'GetOnePermissionUseCase',
            description: 'GetOnePermission',
            result: 'success',
            duration: duration
        }, {
            token: token
        })
    }

    async execute(id: string, user: User) {
        const timer = Timer.create();
        const permission = await this.permissionRepository.findOne(id);
        if(!permission) throw new NotFoundException(`Permission with id ${id} not found.`);
        this.saveLog(user.id, user.getUserName(), timer.stop(), id);
        return permission?.getGraphQLType() ?? null;
    }
}