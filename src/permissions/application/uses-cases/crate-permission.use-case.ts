import { Inject, Injectable } from "@nestjs/common";
import { IPermissionRepository } from "src/permissions/domain/interface/ipermission.repository";
import { CreatePermissionInput } from "../dto/inputs/create-permission.input";
import { PermissionGraphQL } from "src/permissions/interface/graphql/permission.graphql-type";

@Injectable()
export class CreatePermissionUseCase {
	constructor(
		@Inject('PermissionRepository')
		private readonly permissionRepository: IPermissionRepository
	) {};

	async execute(input: CreatePermissionInput) : Promise<PermissionGraphQL> {
		const permission = await this.permissionRepository.create(input);
		return permission.getGraphQLType();
	}
}
