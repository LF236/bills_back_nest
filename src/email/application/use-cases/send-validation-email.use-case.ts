import { Injectable, Inject } from "@nestjs/common";
import { EmailServicePort } from "src/email/domain/ports/email-service.port";

@Injectable()
export class SendValidationEmailUseCase {
    constructor(
        @Inject('EmailServicePort')
        private readonly emailService: EmailServicePort
    ) { };

    async execute(to: string, subject: string, body: string, template: string, token: string): Promise<void> {
        const url = `http://localhost:3000/validate-account?token=${token}`;
        await this.emailService.sendValidateAccountEmail({ to, subject, body, template }, url);
    }
}