import { Module } from '@nestjs/common';
import { PersonResolver } from './person.resolver';
import { CreatePersonUseCase } from './application/use-cases/create-person.use-case';
import { PersonOrmRepositoryImpl } from './infrastructure/orm/typeorm/person.orm-repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonOrmEntity } from './infrastructure/orm/typeorm/person.orm-entity';
import { CommonModule } from 'src/common/common.module';
import { UserModule } from 'src/user/user.module';
import { UpdatePersonUseCase } from './application/use-cases/update-person.use-case';
import { GetPersonByUserIdUseCase } from './application/use-cases/get-person-by-user-id.use-case';
import { forwardRef } from '@nestjs/common';

@Module({
  providers: [
    PersonResolver,
    {
      provide: 'PersonRepository',
      useClass: PersonOrmRepositoryImpl
    },
    // Use Cases
    CreatePersonUseCase,
    UpdatePersonUseCase,
    GetPersonByUserIdUseCase
  ],

  imports: [
    TypeOrmModule.forFeature([ PersonOrmEntity ]),
    CommonModule,
    forwardRef(() => UserModule),
  ],
  exports: [
    TypeOrmModule,
    'PersonRepository',
    GetPersonByUserIdUseCase
  ]
})
export class PersonModule {}
