import { Inject, Injectable } from "@nestjs/common";
import { PaginationArgs } from "src/common/application/dto/args/pagination.args";
import { SearchArgs } from "src/common/application/dto/args/search.args";
import { Timer } from "src/common/domain/timing/timer";
import { LogsService } from "src/logs/logs.service";
import { Permission } from "src/permissions/domain/entities/permission.entity";
import { IPermissionRepository } from "src/permissions/domain/interface/ipermission.repository";
import { PermissionGraphQL } from "src/permissions/interface/graphql/permission.graphql-type";
import { User } from "src/user/domain/entities/user.entity";

@Injectable()
export class GetPermissionsUseCase {
	constructor(
		@Inject('PermissionRepository')
		private readonly permissionRepository: IPermissionRepository,
		private readonly logService: LogsService
	) {};

	async saveLog(user_id: string, user_name: string, duration: number = 0, payload: any) {
		await this.logService.log({
			user_id,
			user_name,
			action: 'Get Permissions',
			module: 'permissions',
			resource: 'GetPermissionsUseCase',
			description: 'Get permissions',
			result: 'success',
			duration: duration,
		}, {
			...payload
		})
	}

	async execute(pagination: PaginationArgs, serch: SearchArgs, user: User) : Promise<{ items: Permission[], total: number }> {
		const time = Timer.create();
		const permissions = await this.permissionRepository.findAll(pagination, serch);
		const count = await this.permissionRepository.count(serch);

		await this.saveLog(user.id, user.getUserName(), time.stop(), { pagination, serch });

		return {
			items: permissions,
			total: count
		}
	}
}
