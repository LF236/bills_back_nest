import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UpdatePersonInput } from "../dto/update-person.input";
import { PersonRepositoryPort } from "src/person/domain/ports/person-repository.port";


@Injectable()
export class UpdatePersonUseCase {
  constructor(
   @Inject('PersonRepository')
   private readonly personRepository: PersonRepositoryPort
  ) {};

  async execute(updatePersonInput: UpdatePersonInput) {
    const exists = await this.personRepository.existsById(updatePersonInput.id);
    if(!exists) throw new NotFoundException(`Person with ID ${updatePersonInput.id} not found.`);
    return await this.personRepository.updatePerson(updatePersonInput);
  }
}