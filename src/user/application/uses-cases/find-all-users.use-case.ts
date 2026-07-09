import { Inject, Injectable } from "@nestjs/common";
import { Timer } from "src/common/domain/timing/timer";
import { PaginationArgs } from "src/common/dtos/args/pagination.args";
import { SearchArgs } from "src/common/dtos/args/search.args";
import { LogsService } from "src/logs/logs.service";
import { User } from "src/user/domain/entities/user.entity";
import { IUserRepository } from "src/user/domain/interfaces/iuser.repository";

@Injectable()
export class FindAllUsersUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository,
        private readonly logService: LogsService
    ) {};

    saveLog(user_id: string, user_name: string, duration = 0, err: any = null) {
        if(!err) {
            this.logService.log({
                user_id,
                user_name,
                action: 'FindAllUsers',
                module: 'User',
                resource: 'FindAllUsersUseCase',
                description: 'Find-All-Users',
                result: 'success',
                message_error: '',
                duration: duration
            })
        } else {
            this.logService.log({
                user_id,
                user_name,
                action: 'FindAllUsers',
                module: 'User',
                resource: 'FindAllUsersUseCase',
                description: 'Find-All-Users',
                result: 'error',
                message_error: err.message ?? 'unknow',
                duration: duration
            })
        }
    }

    async execute(paginationArgs: PaginationArgs, searchArgs: SearchArgs, user: User) {
        const timer = Timer.create();
        const users = await this.userRepository.findAll(paginationArgs, searchArgs);
        const count = await this.userRepository.count(searchArgs);
        this.saveLog(user.getId(), user.getUserName(), timer.stop(), null);
        return {
            users: users,
            total: count
        }
    }
}