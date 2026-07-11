import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Timer } from "src/common/domain/timing/timer";
import { LogsService } from "src/logs/logs.service";
import { IRolRepository } from "src/rols/domain/interface/irol.repository";
import { User } from "src/user/domain/entities/user.entity";

@Injectable()
export class DeleteRolUseCase {
    constructor(
        @Inject('RolRepository')
        private readonly rolRepository: IRolRepository,
        private readonly logsService: LogsService
    ) {};

    async saveLog(user_id: string, user_name: string, duration: number = 0, id: string) {
        await this.logsService.log({
            user_id,
            user_name,
 			action: 'Delete Rol',
			module: 'rols',
			resource: 'DeleteRolUseCase',
			description: 'Delete rol',
			result: 'success',
			duration: duration, 
        }, { id });
    }

    async execute(id: string, user: User) {
        const timer = Timer.create();
        const exists = await this.rolRepository.findOne(id);
        if(!exists) throw new NotFoundException(`Rol with id ${id} not found`);
        await this.saveLog(user.id, user.getUserName(), timer.stop(), id);
        return this.rolRepository.delete(id);
    }
}