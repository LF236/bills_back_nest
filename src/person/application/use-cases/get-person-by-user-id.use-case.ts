import { Inject } from "@nestjs/common";
import { PersonRepositoryPort } from "src/person/domain/ports/person-repository.port";

export class GetPersonByUserIdUseCase {
  constructor(
    @Inject('PersonRepository')
    private readonly personRepository: PersonRepositoryPort
  ) {};

  async execute(id_user: string) {
    const person = await this.personRepository.findByUserId(id_user);
    return person;
  }
}