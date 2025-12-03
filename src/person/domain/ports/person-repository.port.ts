import { UpdatePersonInput } from 'src/person/application/dto/update-person.input';
import { Person } from '../entities/person.entity';
import { CreatePersonInput } from 'src/person/application/dto/create-person.input';

export interface PersonRepositoryPort {
  findById(id: string) : Promise<Person | null>;
  findByUserId(userId: string) : Promise<Person | null>;
  save(person: CreatePersonInput) : Promise<Person>;
  existsById(personId: string): Promise<boolean>;
  updatePerson(updatePersonInput: UpdatePersonInput): Promise<Person>;
}