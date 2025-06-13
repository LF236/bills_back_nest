import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RolsService } from './rols.service';
import { Rol } from './entities/rol.entity';
import { CreateRolInput } from './dto/create-rol.input';
import { UpdateRolInput } from './dto/update-rol.input';

@Resolver(() => Rol)
export class RolsResolver {
	constructor(private readonly rolsService: RolsService) {}

	@Mutation(() => Rol)
	createRol(@Args('createRolInput') createRolInput: CreateRolInput) {
		console.log(createRolInput);
		console.log('HOLA');
		
		return this.rolsService.create(createRolInput);
	}

	// // @Query(() => [Rol], { name: 'rols' })
	// // findAll() {
	// // 	return this.rolsService.findAll();
	// // }
	// //
	// // @Query(() => Rol, { name: 'rol' })
	// // findOne(@Args('id', { type: () => Int }) id: number) {
	// // 	return this.rolsService.findOne(id);
	// // }
	// //
	// // @Mutation(() => Rol)
	// // updateRol(@Args('updateRolInput') updateRolInput: UpdateRolInput) {
	// // 	return this.rolsService.update(updateRolInput.id, updateRolInput);
	// // }
	//
	// @Mutation(() => Rol)
	// removeRol(@Args('id', { type: () => Int }) id: number) {
	// 	return this.rolsService.remove(id);
	// }
}
