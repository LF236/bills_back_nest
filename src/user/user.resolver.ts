import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { CreateUserInput } from './application/dto/create-user.input';
import { UserGraphQL } from './interface/graphql/user.graphql-type';
import { CreateUserUseCase } from './application/uses-cases/create-user.use-case';
import { PaginationArgs } from 'src/common/dtos/args/pagination.args';
import { SearchArgs } from 'src/common/dtos/args/search.args';
import { FindAllUsersUseCase } from './application/uses-cases/find-all-users.use-case';
import { ParseUUIDPipe } from '@nestjs/common';
import { FindOneUserUseCase } from './application/uses-cases/find-one-user.use-case';
import { GplAuthDecorator } from 'src/auth/infraestructure/decorators/gpl-auth.decorator';
import { GetUserDecorator } from 'src/auth/infraestructure/decorators/get-user.decorator';
import { User } from './domain/entities/user.entity';
import { PersonGraphqlType } from 'src/person/interface/person.graphql-type';
import { GetPersonByUserIdUseCase } from 'src/person/application/use-cases/get-person-by-user-id.use-case';

@Resolver(() => UserGraphQL)
export class UserResolver {
	constructor(
		private readonly createUserUseCase: CreateUserUseCase,
		private readonly findAllUsersUseCase: FindAllUsersUseCase,
		private readonly findOneUserUseCase: FindOneUserUseCase,
		private readonly getPersonByUerIdUseCase: GetPersonByUserIdUseCase
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

	@Query(() => UserGraphQL, { name: 'user' })
	findOne(
		@Args('id', { type: () => String }, ParseUUIDPipe) id: string
	) {
		return this.findOneUserUseCase.execute(id);
	}

	@Query(() => UserGraphQL, { name: 'me' })
	@GplAuthDecorator('admin', 'default_user')
	me(
		@GetUserDecorator() user: User
	) {
		return user.getGraphQLType();
	}

	@ResolveField(() => PersonGraphqlType, { nullable: true })
	async person(
		@Parent() user: UserGraphQL
	) {
		const person = await this.getPersonByUerIdUseCase.execute(user.id);
		return person;
	}
}
