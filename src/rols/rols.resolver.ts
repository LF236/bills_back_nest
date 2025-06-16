import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { RolsService } from './rols.service';
import { Rol } from './entities/rol.entity';
import { CreateRolInput } from './dto/create-rol.input';
import { UpdateRolInput } from './dto/update-rol.input';
import { PaginationArgs } from 'src/common/dtos/args/pagination.args';
import { SearchArgs } from 'src/common/dtos/args/search.args';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Rol)
export class RolsResolver {
	constructor(private readonly rolsService: RolsService) {}

	@Mutation(() => Rol)
	async createRol(
		@Args('createRolInput') createRolInput: CreateRolInput
	) : Promise<Rol> {	
		return this.rolsService.create(createRolInput);
	}

	@Query(() => [Rol], { name: 'rols' })
	async findAll(
		@Args() paginationArgs: PaginationArgs,
		@Args() searchArgs: SearchArgs
	) {		 
		return this.rolsService.findAll(paginationArgs, searchArgs);
	}
	
	@Query(() => Rol, { name: 'rol' })
	async findOne(@Args('id', { type: () => ID }) id: string) : Promise<Rol> {
		return this.rolsService.findOne(id);
	}
	
	@Mutation(() => Rol)
	updateRol(@Args('updateRolInput') updateRolInput: UpdateRolInput) {
		return this.rolsService.update(updateRolInput.id, updateRolInput);
	}

	
	@Mutation(() => Rol)
	removeRol(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
		return this.rolsService.remove(id);
	}
}
