import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Timer } from 'src/common/domain/timing/timer';
import { EmailServicePort } from 'src/email/domain/ports/email-service.port';
import { ApplicationException } from 'src/exceptions/application.exception';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/user/domain/entities/user.entity';

@Injectable()
export class SendEmailRenewPasswordUseCase {
  constructor(
    @Inject('EmailServicePort')
    private readonly emailService: EmailServicePort,
    private readonly configService: ConfigService,
    private readonly logsService: LogsService
  ) {};

  getFrontDomain(): string {
    return this.configService.get<string>('FRONT_DOMAIN') || 'http://localhost:3000';
  }

  async saveLog(user_id: string | null, user_name: string, duration: number, payload: any) {
    await this.logsService.log({
      user_id: user_id ?? null,
      user_name: user_name ?? null,
      action: 'Send renew password email',
      module: 'email',
      resource: 'SendEmailRenewPasswordUseCase',
      description: 'System send a new email with new password',
      result: 'success',
      duration: duration
    }, { ...payload });
  }

  async execute(to: string, subject: string, body: string, template: string, password: string, user: User | null) : Promise<void> {
    const timer = Timer.create();
    const url = `${this.getFrontDomain()}/auth/login`;
    const result = await this.emailService.sendEmailWithTemplate({
      to,
      subject,
      body,
      template
    }, { password, url });

    if(!result) {
      throw new ApplicationException('Email can not be send');
    }

    await this.saveLog(user?.id ?? null, user?.getUserName() ?? 'anonymous', timer.stop(), {
      to,
      subject,
    });
  } 

}