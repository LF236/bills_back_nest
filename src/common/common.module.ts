import { Module } from '@nestjs/common';
import { UuidAdapter } from './infraestructure/adapters/uuid.adapter';

@Module({
    providers: [
        {
            provide: 'UuidGeneratorPort',
            useClass: UuidAdapter
        }
    ],
    exports: ['UuidGeneratorPort']
})
export class CommonModule {};