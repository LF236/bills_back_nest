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
import { GetRolsGraphQL } from './interfaces/graphql/get-rols.graphql-type';
import { GplAuthDecorator } from 'src/auth/infraestructure/decorators/gpl-auth.decorator';
import { Audit } from 'src/logs/infrastructure/decorators/audit.decorator';
import { GetUserDecorator } from 'src/auth/infraestructure/decorators/get-user.decorator';
import { User } from 'src/user/domain/entities/user.entity';
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
	@GplAuthDecorator('admin', 'default_user')
	@Audit({
		module: 'rols',
		action: 'Create Rol',
		resource: 'RolsResolver',
		description: 'Admin Create Rol'
	})
	createRol(
		@Args('createRolInput') createRolInput: CreateRolInput,
		@GetUserDecorator() user: User
	) {
		return this.createRolUseCase.execute(createRolInput, user);
	}

	@Query(() => GetRolsGraphQL, { name: 'rols' })
	@GplAuthDecorator('admin', 'default_user')
	@Audit({
		module: 'rols',
		action: 'Get Rols',
		resource: 'RolsResolver',
		description: 'Admin Get Rols'
	})
	findAll(
		@Args() paginationArgs: PaginationArgs,
		@Args() searchArgs: SearchArgs,
		@GetUserDecorator() user: User
	) {
		return this.getRolsUseCae.execute(paginationArgs, searchArgs, user);
	}

	@Query(() => RolsGraphql, { name: 'rol' })
	@GplAuthDecorator('admin', 'default_user')
	@Audit({
		module: 'rols',
		action: 'Get One Rol',
		resource: 'RolsResolver',
		description: 'Admin Get One Rol'		
	})
	findOne(
		@Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
		@GetUserDecorator() user: User
	) {
		return this.findOneRolUseCase.execute(id, user);
	}

	@Mutation(() => RolsGraphql, { name: 'updateRol' })
	@GplAuthDecorator('admin', 'default_user')
	@Audit({
		module: 'rols',
		action: 'Update Rol',
		resource: 'RolsResolver',
		description: 'Admin Update Rol'		
	})	
	updateRol(
		@Args('updateRolInput') updateRolInput: UpdateRolInput,
		@GetUserDecorator() user: User
	) {
		return this.updateRolUseCase.execute(updateRolInput, user);
	}

	@Mutation(() => Boolean, { name: 'deleteRol' })
	@GplAuthDecorator('admin', 'default_user')
	@Audit({
		module: 'rols',
		action: 'Delete Rol',
		resource: 'RolsResolver',
		description: 'Admin Delete Rol'
	})
	removeRol(
		@Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
		@GetUserDecorator() user: User
	) {
		return this.deleteRolUseCase.execute(id, user);
	}

	@ResolveField(() => [ GetOnlyPermissionGraphQL ])
	async permissionsList(
		@Parent() rol: RolsGraphql
	) {
		const { id } = rol;
		return this.permissionsLoader.getLoader().load(id);
	}
}
