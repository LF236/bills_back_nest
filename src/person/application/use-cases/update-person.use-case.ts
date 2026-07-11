import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UpdatePersonInput } from "../dto/update-person.input";
import { PersonRepositoryPort } from "src/person/domain/ports/person-repository.port";
import { LogsService } from "src/logs/logs.service";
import { User } from "src/user/domain/entities/user.entity";
import { Timer } from "src/common/domain/timing/timer";
@Injectable()
export class UpdatePersonUseCase {
  constructor(
   @Inject('PersonRepository')
   private readonly personRepository: PersonRepositoryPort,
   private readonly logsService: LogsService
  ) {};

  async saveLog(user_id: string, user_name: string, duration: number = 0, payload: any) {
    await this.logsService.log({
      user_id,
			user_name,
			action: 'Update Person',
			module: 'person',
			resource: 'UpdatePersonUseCase',
			description: 'User update person',
			result: 'success',
			duration: duration,
    }, {...payload});
  }

  async execute(updatePersonInput: UpdatePersonInput, user: User) {
    const timer = Timer.create();
    const exists = await this.personRepository.existsById(updatePersonInput.id);
    if(!exists) throw new NotFoundException(`Person with ID ${updatePersonInput.id} not found.`);
    const person_update = await this.personRepository.updatePerson(updatePersonInput);
    await this.saveLog(user.id, user.getUserName(), timer.stop(), updatePersonInput)
    return person_update;
  }
}