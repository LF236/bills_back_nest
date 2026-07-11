import { Inject } from "@nestjs/common";
import { Timer } from "src/common/domain/timing/timer";
import { LogsService } from "src/logs/logs.service";
import { PersonRepositoryPort } from "src/person/domain/ports/person-repository.port";
import { UserGraphQL } from "src/user/interface/graphql/user.graphql-type";

export class GetPersonByUserIdUseCase {
  constructor(
    @Inject('PersonRepository')
    private readonly personRepository: PersonRepositoryPort,
    private readonly logsService: LogsService
  ) {};

  async saveLog(user_id: string, user_name: string, duration: number = 0, payload: any) {
    await this.logsService.log({
      user_id,
      user_name,
      action: 'GetPerson',
      module: 'Person',
      resource: 'GetPersonByUserIdUseCase',
      description: 'Get person by user id',
      result: 'success',
      message_error: '',
      duration: duration
    }, { ...payload });
  }

  async execute(id_user: string, user: UserGraphQL) {
    const timer = Timer.create();
    const person = await this.personRepository.findByUserId(id_user);
    await this.saveLog(user.id, user.name, timer.stop(), { id_user, id_person: person?.getId() })
    return person;
  }
}