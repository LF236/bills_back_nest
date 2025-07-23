import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateUserInput } from './application/dto/create-user.input';
import { UserGraphQL } from './interface/graphql/user.graphql-type';
import { CreateUserUseCase } from './application/uses-cases/create-user.use-case';


@Resolver(() => String)
export class UserResolver {
	constructor(
		// Inject uses cases
		private readonly createUserUseCase: CreateUserUseCase
	) {};
	
	@Mutation(() => UserGraphQL)
	createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
		return this.createUserUseCase.execute(createUserInput);

	} 
}
