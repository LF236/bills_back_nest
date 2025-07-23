import { Inject, Injectable } from "@nestjs/common";
import { IPermissionRepository } from "src/permissions/domain/interface/ipermission.repository";
import { CreatePermissionInput } from "../dto/inputs/create-permission.input";

@Injectable()
export class CreatePermissionUseCase {
	constructor(
		@Inject('PermissionRepository')
		private readonly permissionRepository: IPermissionRepository
	) {};

	async execute(input: CreatePermissionInput) : Promise<any> {
		console.log(input);
		console.log('Hello from CreatePermissionUseCase');
	}
}
