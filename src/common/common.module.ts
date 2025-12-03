import { Module } from '@nestjs/common';
import { UuidAdapter } from './infraestructure/adapters/uuid.adapter';
import { registerEnumType } from '@nestjs/graphql';
import { Sex } from './domain/enums/sex.enum';

@Module({
    providers: [
        {
            provide: 'UuidGeneratorPort',
            useClass: UuidAdapter
        }
    ],
    exports: ['UuidGeneratorPort']
})
export class CommonModule {
    constructor() {
        registerEnumType(Sex, {
            name: 'Sex',
            description: 'Gender of a person'
        })
    }
};