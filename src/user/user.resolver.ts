import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateUserInput } from './application/dto/create-user.input';
import { UserGraphQL } from './interface/graphql/user.graphql-type';
import { CreateUserUseCase } from './application/uses-cases/create-user.use-case';
import { PaginationArgs } from 'src/common/dtos/args/pagination.args';
import { SearchArgs } from 'src/common/dtos/args/search.args';
import { FindAllUsersUseCase } from './application/uses-cases/find-all-users.use-case';


@Resolver(() => UserGraphQL)
export class UserResolver {
	constructor(
		private readonly createUserUseCase: CreateUserUseCase,
		private readonly findAllUsersUseCase: FindAllUsersUseCase
	) {};
	
	@Mutation(() => UserGraphQL)
	createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
		return this.createUserUseCase.execute(createUserInput);
	}

	@Query(() => [UserGraphQL], { name: 'users' })
	findAll(
		@Args() paginationArgs: PaginationArgs,
		@Args() searchArgs: SearchArgs
	) {
		return this.findAllUsersUseCase.execute(paginationArgs, searchArgs);
	}
}
