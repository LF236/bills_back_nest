import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Timer } from "src/common/domain/timing/timer";
import { LogsService } from "src/logs/logs.service";
import { User } from "src/user/domain/entities/user.entity";
import { IUserRepository } from "src/user/domain/interfaces/iuser.repository";

@Injectable()
export class FindOneUserUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository,
        private readonly logsService: LogsService
    ) {};

    async saveLog(user_id: string, user_name: string, duration = 0, user_to_search: string) {
        await this.logsService.log({
            user_id,
            user_name,
            action: 'FindOne',
            module: 'User',
            resource: 'FindOneUserUseCase',
            description: user_name + 'find user',
            result: 'success',
            message_error: '',
            duration: duration
        }, { user_to_search })
     }

    async execute(id: string, userAuthenticated: User) {
        const timer = Timer.create();
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        this.saveLog(userAuthenticated.getId(), userAuthenticated.getUserName(), timer.stop(), id);

        return user;
    }
}