import { Module } from '@nestjs/common';
import { NodemailerEmailService } from './infrastructure/nodemailer-email.service';
import { SendEmailUseCase } from './application/use-cases/send-email.use-case';
import { SendValidationEmailUseCase } from './application/use-cases/send-validation-email.use-case';
import { LogsModule } from 'src/logs/logs.module';

@Module({
    providers: [
        NodemailerEmailService,
        SendEmailUseCase,
        SendValidationEmailUseCase,
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
        }
    ],
    exports: [
        SendEmailUseCase,
        SendValidationEmailUseCase,
        'EmailServicePort',
        'SendValidationEmailUseCase'
    ],
    imports: [
        LogsModule
    ]
})
export class EmailModule {}