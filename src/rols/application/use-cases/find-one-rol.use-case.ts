import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Timer } from "src/common/domain/timing/timer";
import { LogsService } from "src/logs/logs.service";
import { IRolRepository } from "src/rols/domain/interface/irol.repository";
import { User } from "src/user/domain/entities/user.entity";

@Injectable()
export class FindOneRolUseCase {
    constructor(
        @Inject('RolRepository')
        private readonly rolRepository: IRolRepository,
        private readonly logsService: LogsService
    ) {};

    async saveLog(user_id: string, user_name: string, duration: number = 0, id: string) {
        this.logsService.log({
            user_id,
            user_name,
            action: 'Get One Rol',
			module: 'rols',
			resource: 'FindOneRolUseCase',
			description: 'Get one rol',
			result: 'success',
			duration: duration,   
        }, { id });
    }

    async execute(id: string, user: User) {
        const timer = Timer.create();
        const rol = await this.rolRepository.findOne(id);
        if(!rol) throw new NotFoundException(`Rol with id ${id} not found`);
        this.saveLog(user.id, user.getUserName(), timer.stop(), id);
        return rol;
    }
}