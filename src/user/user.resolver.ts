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
import { GetUsersGraphQL } from './interface/graphql/get-users.graphql-type';
import { GetMeUseCase } from './application/uses-cases/get-me.use-case';
import { Audit } from 'src/logs/infrastructure/decorators/audit.decorator';
import { ResetPasswordUserCase } from './application/uses-cases/reset-password.use-case';

@Resolver(() => UserGraphQL)
export class UserResolver {
	constructor(
		private readonly createUserUseCase: CreateUserUseCase,
		private readonly findAllUsersUseCase: FindAllUsersUseCase,
		private readonly findOneUserUseCase: FindOneUserUseCase,
		private readonly getPersonByUerIdUseCase: GetPersonByUserIdUseCase,
		private readonly getMeUseCase: GetMeUseCase,
		private readonly resetPasswordUseCase: ResetPasswordUserCase
	) {};
	
	@Mutation(() => UserGraphQL)
	@GplAuthDecorator('admin', 'default_user')
	@Audit({
		module: 'users',
		action: 'Create User Admin',
		resource: 'UserResolver',
		description: 'Admin Create Account'
	})
	createUser(
		@Args('createUserInput') createUserInput: CreateUserInput,
		@GetUserDecorator() user: User
	) {
		return this.createUserUseCase.execute(createUserInput, user);
	}

	@Query(() => GetUsersGraphQL, { name: 'users' })
	@GplAuthDecorator('admin', 'default_user')
	@Audit({
		module: 'users',
		action: 'Get Users Admin',
		resource: 'UserResolver',
		description: 'Admin get users'
	})
	findAll(
		@Args() paginationArgs: PaginationArgs,
		@Args() searchArgs: SearchArgs,
		@GetUserDecorator() user: User
	) {
		return this.findAllUsersUseCase.execute(paginationArgs, searchArgs, user);
	}

	@Query(() => UserGraphQL, { name: 'user' })
	@GplAuthDecorator('admin', 'default_user')
	@Audit({
		module: 'users',
		action: 'Get One User',
		resource: 'UserResolver',
		description: 'Admin get one user'
	})
	findOne(
		@Args('id', { type: () => String }, ParseUUIDPipe) id: string,
		@GetUserDecorator() user: User
	) {
		return this.findOneUserUseCase.execute(id, user);
	}

	@Query(() => UserGraphQL, { name: 'me' })
	@GplAuthDecorator('admin', 'default_user')
	@Audit({
		module: 'users',
		action: 'Get Me',
		resource: 'UserResolver',
		description: 'User get me information'
	})
	me(
		@GetUserDecorator() user: User
	) {
		return this.getMeUseCase.execute(user);
	}

	@Mutation(() => Boolean)
	@GplAuthDecorator('admin', 'default_user')
	@Audit({
		module: 'users',
		action: 'Reset Password',
		resource: 'UserResolver',
		description: 'Admin reset user password'
	})
	adminRequestUserPassword(
		@Args('id', { type: () => String }, ParseUUIDPipe) id: string,
		@GetUserDecorator() user: User
	) {
		return this.resetPasswordUseCase.execute(id, user);
	}

	@ResolveField(() => PersonGraphqlType, { nullable: true })
	async person(
		@Parent() user: UserGraphQL,
	) {
		const person = await this.getPersonByUerIdUseCase.execute(user.id, user);
		return person;
	}

	@ResolveField(() => String, { nullable: true })
	async avatarUrl(
		@Parent() user: UserGraphQL,
	) {
		const url = process.env.UPLOADS_URL || 'http://localhost:3000/api/files/avatar/';
		const avatarUrl = user.avatar_file_id ? `${url}${user.avatar_file_id}` : null;
		return avatarUrl || null;
	}
}
