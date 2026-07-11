import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { PersonGraphqlType } from './interface/person.graphql-type';
import { CreatePersonInput } from './application/dto/create-person.input';
import { CreatePersonUseCase } from './application/use-cases/create-person.use-case';
import { UpdatePersonInput } from './application/dto/update-person.input';
import { UpdatePersonUseCase } from './application/use-cases/update-person.use-case';
import { GplAuthDecorator } from 'src/auth/infraestructure/decorators/gpl-auth.decorator';
import { Audit } from 'src/logs/infrastructure/decorators/audit.decorator';
import { GetUserDecorator } from 'src/auth/infraestructure/decorators/get-user.decorator';
import { User } from 'src/user/domain/entities/user.entity';

@Resolver(() => PersonGraphqlType)
export class PersonResolver {
  constructor(
    private readonly createPersonUseCase: CreatePersonUseCase,
    private readonly updatePersonUseCase: UpdatePersonUseCase
  ) {};
  
  @Mutation(() => PersonGraphqlType, { name: 'createPerson' })
  @GplAuthDecorator('admin', 'default_user')
  @Audit({
    module: 'person',
    action: 'Create Person',
    resource: 'PersonResolver',
    description: 'User Create Person'
  })
  createPerson(
    @Args('createPersonInput') createPersonInput: CreatePersonInput,
    @GetUserDecorator() user: User
  ) {
    return this.createPersonUseCase.execute(createPersonInput, user);
  }

  @Mutation(() => PersonGraphqlType, { name: 'updatePerson' })
  @GplAuthDecorator('admin', 'default_user')
  @Audit({
    module: 'person',
    action: 'Update Person',
    resource: 'PersonResolver',
    description: 'User Update Person'
  })
  updatePerson(
    @Args('updatePersonInput') updatePersonInput: UpdatePersonInput,
    @GetUserDecorator() user: User
  ) {
    return this.updatePersonUseCase.execute(updatePersonInput, user);
  }
}
