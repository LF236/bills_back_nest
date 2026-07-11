import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { IPermissionRepository } from "src/permissions/domain/interface/ipermission.repository";
import { CreatePermissionInput } from "../dto/inputs/create-permission.input";
import { PermissionGraphQL } from "src/permissions/interface/graphql/permission.graphql-type";
import { LogsService } from "src/logs/logs.service";
import { User } from "src/user/domain/entities/user.entity";
import { Timer } from "src/common/domain/timing/timer";

@Injectable()
export class CreatePermissionUseCase {
	constructor(
		@Inject('PermissionRepository')
		private readonly permissionRepository: IPermissionRepository,
		private readonly logService: LogsService
	) {};

	async saveLog(user_id: string, user_name: string, duration: number = 0, payload: any) {
		await this.logService.log({
			user_id,
			user_name,
			action: 'Create Permission',
			module: 'permissions',
			resource: 'CreatePermissionUseCase',
			description: 'Create new permission',
			result: 'success',
			duration: duration,
		}, {
			...payload
		})
	}

	async execute(input: CreatePermissionInput, user: User) : Promise<PermissionGraphQL> {
		const time = Timer.create();
		const existingPermission = await this.permissionRepository.findByName(input.name);

		if(existingPermission) {
			throw new BadRequestException(`Permission with name ${input.name} already exists.`);
		}
		
		const permission = await this.permissionRepository.create(input);
		await this.saveLog(user.id, user.getUserName(), time.stop(), input);
		return permission.getGraphQLType();
	}
}
