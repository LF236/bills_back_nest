import { Inject, Injectable } from "@nestjs/common";
import { PaginationArgs } from "src/common/application/dto/args/pagination.args";
import { SearchArgs } from "src/common/application/dto/args/search.args";
import { Permission } from "src/permissions/domain/entities/permission.entity";
import { IPermissionRepository } from "src/permissions/domain/interface/ipermission.repository";
import { PermissionGraphQL } from "src/permissions/interface/graphql/permission.graphql-type";

@Injectable()
export class GetPermissionsUseCase {
	constructor(
		@Inject('PermissionRepository')
		private readonly permissionRepository: IPermissionRepository
	) {};

	async execute(pagination: PaginationArgs, serch: SearchArgs) : Promise<{ items: Permission[], total: number }> {
		const permissions = await this.permissionRepository.findAll(pagination, serch);
		const count = await this.permissionRepository.count(serch);

		return {
			items: permissions,
			total: count
		}
	}
}
