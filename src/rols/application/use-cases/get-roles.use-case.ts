import { Inject, Injectable } from "@nestjs/common";
import { Timer } from "src/common/domain/timing/timer";
import { PaginationArgs } from "src/common/dtos/args/pagination.args";
import { SearchArgs } from "src/common/dtos/args/search.args";
import { LogsService } from "src/logs/logs.service";
import { IRolRepository } from "src/rols/domain/interface/irol.repository";
import { User } from "src/user/domain/entities/user.entity";

@Injectable()
export class GetRolesUseCase {
	constructor(
		@Inject('RolRepository')
		private readonly rolRepository: IRolRepository,
		private readonly logsService: LogsService
	) {};

	async saveLog(user_id: string, user_name: string, duration: number = 0, payload: any) {
		await this.logsService.log({
			user_id,
			user_name,
			action: 'Get Rols',
			module: 'rols',
			resource: 'GetRolesUseCase',
			description: 'Get rols list',
			result: 'success',
			duration: duration,   	
		}, { ...payload })
	}

	async execute(paginationArgs: PaginationArgs, searchArgs: SearchArgs, user: User) {
		const timer = Timer.create();
		const items = await this.rolRepository.get(paginationArgs, searchArgs);
		const count = await this.rolRepository.count(searchArgs);
		await this.saveLog(user.id, user.getUserName(), timer.stop(), { ...paginationArgs, ...searchArgs });
		return {
			items: items,
			total: count
		}
	}
}