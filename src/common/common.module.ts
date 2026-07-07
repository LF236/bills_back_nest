import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UuidAdapter } from './infraestructure/adapters/uuid.adapter';
import { registerEnumType } from '@nestjs/graphql';
import { Sex } from './domain/enums/sex.enum';
import { PersonTypes } from './domain/enums/person-types.enum';
import { RequesContextMiddleware } from './infraestructure/middlewares/request-context.middleware';
import { RequestContextService } from './infraestructure/context/request-context.service';

@Module({
    providers: [
        {
            provide: 'UuidGeneratorPort',
            useClass: UuidAdapter
        },
        RequestContextService
    ],
    exports: [
        'UuidGeneratorPort',
        RequestContextService
    ]
})
export class CommonModule implements NestModule {
    constructor() {
        registerEnumType(Sex, {
            name: 'Sex',
            description: 'Gender of a person'
        }),
        registerEnumType(PersonTypes, {
            name: 'PersonTypes',
            description: 'Type of a person, either physical or moral'
        })
    }

    configure(consumer: MiddlewareConsumer) {
     consumer
        .apply(RequesContextMiddleware)
        .forRoutes('*')
    }
};