import { Injectable } from '@nestjs/common';
import { PersonRepositoryPort } from 'src/person/domain/ports/person-repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonOrmEntity } from './person.orm-entity';
import { Person } from 'src/person/domain/entities/person.entity';
import { CreatePersonInput } from 'src/person/application/dto/create-person.input';
import { UpdatePersonInput } from 'src/person/application/dto/update-person.input';

@Injectable()
export class PersonOrmRepositoryImpl implements PersonRepositoryPort {
  constructor(
    @InjectRepository(PersonOrmEntity)
    private readonly repo: Repository<PersonOrmEntity>
  ) {};

  async findById(id: string) : Promise<Person | null> {
    const query = await this.repo.createQueryBuilder('person')
      .where('person.id = :id', { id })
      .andWhere('person.deleted_at IS NULL')
      .getOne();

    if(!query) return null;

    return Person.createFromObj(query);
  }

  async findByUserId(userId: string): Promise<Person | null> {
    const query = await this.repo.createQueryBuilder('person')
      .where('person.user_id = :userId', { userId })
      .andWhere('person.deleted_at IS NULL')
      .getOne();
    if(!query) return null;

    return Person.createFromObj(query);
  }

  async save(person: CreatePersonInput): Promise<Person> {
    await this.repo.save({
      first_name: person.first_name,
      last_name: person.last_name,
      second_last_name: person.second_last_name,
      sex: person.sex ?? '0',
      birth_date: person.birth_date,
      curp: person.curp ?? null,
      rfc: person.rfc ?? null,
      userId: person.id_user
    });

    const savedPerson = await this.findByUserId(person.id_user);
    
    return savedPerson!;
  }

  async existsById(personId: string): Promise<boolean> {
    const person = await this.repo.createQueryBuilder('person')
      .where('person.id = :personId', { personId })
      .andWhere('person.deleted_at IS NULL')
      .getCount();
    return person > 0;
  }

  async updatePerson(updatePersonInput: UpdatePersonInput) : Promise<Person> {
    const personToUpdate = (await this.repo.createQueryBuilder('person')
      .where('person.id = :id', { id: updatePersonInput.id })
      .andWhere('person.deleted_at IS NULL')
      .getOne())!;

    if(updatePersonInput.first_name !== undefined) {
      personToUpdate.first_name = updatePersonInput.first_name;
    }
    if(updatePersonInput.last_name !== undefined) {
      personToUpdate.last_name = updatePersonInput.last_name;
    }
    if(updatePersonInput.second_last_name !== undefined) {
      personToUpdate.second_last_name = updatePersonInput.second_last_name;
    }
    if(updatePersonInput.sex !== undefined) {
      personToUpdate.sex = updatePersonInput.sex;
    }
    if(updatePersonInput.birth_date !== undefined) {
      personToUpdate.birth_date = updatePersonInput.birth_date;
    }
    if(updatePersonInput.curp !== undefined) {
      personToUpdate.curp = updatePersonInput.curp;
    }
    if(updatePersonInput.rfc !== undefined) {
      personToUpdate.rfc = updatePersonInput.rfc;
    }

    await this.repo.save(personToUpdate);

    const updatedPerson = await this.findById(personToUpdate.id);
    return updatedPerson!;
  }
  
}