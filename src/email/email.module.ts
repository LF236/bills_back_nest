import { Module } from '@nestjs/common';
import { NodemailerEmailService } from './infrastructure/nodemailer-email.service';
import { SendEmailUseCase } from './application/use-cases/send-email.use-case';

@Module({
    providers: [
        NodemailerEmailService,
        SendEmailUseCase,
        {
            provide: 'EmailServicePort',
            useClass: NodemailerEmailService
        },
        {
            provide: 'SendEmailUseCase',
            useClass: SendEmailUseCase
        }
    ],
    exports: [
        SendEmailUseCase,
        'EmailServicePort'
    ]
})
export class EmailModule {}