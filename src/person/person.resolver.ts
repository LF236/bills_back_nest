import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { PersonGraphqlType } from './interface/person.graphql-type';
import { CreatePersonInput } from './application/dto/create-person.input';
import { CreatePersonUseCase } from './application/use-cases/create-person.use-case';
import { UpdatePersonInput } from './application/dto/update-person.input';
import { UpdatePersonUseCase } from './application/use-cases/update-person.use-case';

@Resolver(() => PersonGraphqlType)
export class PersonResolver {
  constructor(
    private readonly createPersonUseCase: CreatePersonUseCase,
    private readonly updatePersonUseCase: UpdatePersonUseCase
  ) {};
  
  @Mutation(() => PersonGraphqlType, { name: 'createPerson' })
  createPerson(
    @Args('createPersonInput') createPersonInput: CreatePersonInput
  ) {
    return this.createPersonUseCase.execute(createPersonInput);
  }

  @Mutation(() => PersonGraphqlType, { name: 'updatePerson' })
  updatePerson(
    @Args('updatePersonInput') updatePersonInput: UpdatePersonInput
  ) {
    return this.updatePersonUseCase.execute(updatePersonInput);
  }
}
