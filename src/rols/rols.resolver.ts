import { Resolver, Query, Mutation, Args, Int, ID, Parent, ResolveField } from '@nestjs/graphql';
import { UpdateRolInput } from './dto/update-rol.input';
import { PaginationArgs } from 'src/common/dtos/args/pagination.args';
import { SearchArgs } from 'src/common/dtos/args/search.args';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateRolUseCase } from './application/use-cases/create-rol.use-case';
import { RolsGraphql } from './interfaces/graphql/rols.graphql-type';
import { CreateRolInput } from './application/dto/inputs/create-rol.input';
import { FindOneRolUseCase } from './application/use-cases/find-one-rol.use-case';
import { UpdateRolUseCase } from './application/use-cases/update-rol.use-case';
import { GetRolesUseCase } from './application/use-cases/get-roles.use-case';
import { DeleteRolUseCase } from './application/use-cases/delete-rol.use-case';
import { PermissionsLoader } from 'src/permissions/infrastructure/orm/typeorm/loaders/permissions.loader';
import { PermissionGraphQL } from 'src/permissions/interface/graphql/permission.graphql-type';
import { GetOnlyPermissionGraphQL } from 'src/permissions/interface/graphql/get-only-permission.graphql-type';
CreateRolInput;
@Resolver(() => RolsGraphql)
export class RolsResolver {
	constructor(
		private readonly createRolUseCase: CreateRolUseCase,
		private readonly findOneRolUseCase: FindOneRolUseCase,
		private readonly updateRolUseCase: UpdateRolUseCase,
		private readonly getRolsUseCae: GetRolesUseCase,
		private readonly deleteRolUseCase: DeleteRolUseCase,
		private readonly permissionsLoader: PermissionsLoader
	) {};


	@Mutation(() => RolsGraphql)
	createRol(
		@Args('createRolInput') createRolInput: CreateRolInput
	) {
		return this.createRolUseCase.execute(createRolInput);
	}

	@Query(() => [RolsGraphql], { name: 'rols' })
	findAll(
		@Args() paginationArgs: PaginationArgs,
		@Args() searchArgs: SearchArgs
	) {
		return this.getRolsUseCae.execute(paginationArgs, searchArgs);
	}

	@Query(() => RolsGraphql, { name: 'rol' })
	findOne(
		@Args('id', { type: () => ID }, ParseUUIDPipe) id: string
	) {
		return this.findOneRolUseCase.execute(id);
	}

	@Mutation(() => RolsGraphql, { name: 'updateRol' })
	updateRol(
		@Args('updateRolInput') updateRolInput: UpdateRolInput
	) {
		return this.updateRolUseCase.execute(updateRolInput);
	}

	@Mutation(() => Boolean, { name: 'deleteRol' })
	removeRol(
		@Args('id', { type: () => ID }, ParseUUIDPipe) id: string
	) {
		return this.deleteRolUseCase.execute(id);
	}

	@ResolveField(() => [ GetOnlyPermissionGraphQL ])
	async permissionsList(
		@Parent() rol: RolsGraphql
	) {
		const { id } = rol;
		return this.permissionsLoader.getLoader().load(id);
	}
}
