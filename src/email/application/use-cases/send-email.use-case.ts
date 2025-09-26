import { Inject, Injectable } from "@nestjs/common";
import { EmailServicePort } from "src/email/domain/ports/email-service.port";

@Injectable()
export class SendEmailUseCase {
    constructor(
        @Inject('EmailServicePort')
        private readonly emailService: EmailServicePort
    ) {};

    async execute(to: string, subject: string, body: string, template: string, token: string) : Promise<void> {
        await this.emailService.sendEmail({ to, subject, body, template });
    }
}