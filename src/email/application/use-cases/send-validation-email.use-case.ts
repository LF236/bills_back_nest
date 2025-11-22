import { Injectable, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EmailServicePort } from "src/email/domain/ports/email-service.port";

@Injectable()
export class SendValidationEmailUseCase {
    constructor(
        @Inject('EmailServicePort')
        private readonly emailService: EmailServicePort,
        private readonly configSiervice: ConfigService
    ) {};

    getFrontDomain(): string {
        return this.configSiervice.get<string>('FRONT_DOMAIN') || 'http://localhost:3000';
    }

    async execute(to: string, subject: string, body: string, template: string, token: string): Promise<void> {
        const url = `${this.getFrontDomain()}/auth/validate-token/${token}`;
        await this.emailService.sendValidateAccountEmail({ to, subject, body, template }, url);
    }
}