import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';


@Resolver(() => String)
export class UserResolver {
	@Mutation(() => String)
	createUser(@Args('createUserInput') createUserInput: any) {
		return 'This action adds a new user';
	} 
}
