import { Injectable, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Timer } from "src/common/domain/timing/timer";
import { EmailServicePort } from "src/email/domain/ports/email-service.port";
import { LogsService } from "src/logs/logs.service";
import { User } from "src/user/domain/entities/user.entity";

@Injectable()
export class SendValidationEmailUseCase {
    constructor(
        @Inject('EmailServicePort')
        private readonly emailService: EmailServicePort,
        private readonly configSiervice: ConfigService,
        private readonly logsService: LogsService
    ) {};

    async saveLog(user_id: string | null, user_name: string | null, duration: number = 0, payload: any) {
        await this.logsService.log({
            user_id: user_id ?? null,
            user_name: user_name ?? 'anonymous',
            action: 'Send Email Validation',
            module: 'email',
            resource: 'SendValidationEmailUseCase',
            description: 'System send email validation',
            result: 'success',
            duration: duration
        }, { ...payload });
    }

    getFrontDomain(): string {
        return this.configSiervice.get<string>('FRONT_DOMAIN') || 'http://localhost:3000';
    }

    async execute(to: string, subject: string, body: string, template: string, token: string, user: User | null): Promise<void> {
        const timer = Timer.create();
        const url = `${this.getFrontDomain()}/auth/validate-token/${token}`;
        await this.emailService.sendValidateAccountEmail({ to, subject, body, template }, url);
        await this.saveLog(user?.id ?? null, user?.getUserName() ?? 'anonymous', timer.stop(), {
            to,
            subject,
            token,
            url
        });
    }
}