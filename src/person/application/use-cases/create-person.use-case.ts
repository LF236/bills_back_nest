import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreatePersonInput } from "../dto/create-person.input";
import { PersonRepositoryPort } from "src/person/domain/ports/person-repository.port";
import { IUserRepository } from "src/user/domain/interfaces/iuser.repository";

@Injectable()
export class CreatePersonUseCase {
  constructor(
    @Inject('PersonRepository')
    private readonly personRepository: PersonRepositoryPort,
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {};

  async execute(createPersonInput: CreatePersonInput) {
    const isExists = await this.personRepository.findByUserId(createPersonInput.id_user);
    
    if(isExists) {
      throw new BadRequestException(`Person with user ID ${createPersonInput.id_user} already exists.`);
    }

    const userExists = await this.userRepository.existsById(createPersonInput.id_user);
    if(!userExists) {
      throw new BadRequestException(`User with ID ${createPersonInput.id_user} does not exist.`);
    }

    const newPerson = await this.personRepository.save(createPersonInput);
    return newPerson;
  }
}