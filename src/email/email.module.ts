import { Module } from '@nestjs/common';
import { NodemailerEmailService } from './infrastructure/nodemailer-email.service';
import { SendEmailUseCase } from './application/use-cases/send-email.use-case';
import { SendValidationEmailUseCase } from './application/use-cases/send-validation-email.use-case';
import { LogsModule } from 'src/logs/logs.module';
import { SendEmailRenewPasswordUseCase } from './application/use-cases/send-email-renew-password.use-case';

@Module({
    providers: [
        NodemailerEmailService,
        SendEmailUseCase,
        SendValidationEmailUseCase,
        SendEmailRenewPasswordUseCase,
        {
            provide: 'EmailServicePort',
            useClass: NodemailerEmailService
        },
        {
            provide: 'SendEmailUseCase',
            useClass: SendEmailUseCase
        },
        {
            provide: 'SendValidationEmailUseCase',
            useClass: SendValidationEmailUseCase
        },
        {
            provide: 'SendEmailRenewPasswordUseCase',
            useClass: SendEmailRenewPasswordUseCase
        }
    ],
    exports: [
        SendEmailUseCase,
        SendValidationEmailUseCase,
        SendEmailRenewPasswordUseCase,
        'EmailServicePort',
        'SendValidationEmailUseCase'
    ],
    imports: [
        LogsModule
    ]
})
export class EmailModule {}