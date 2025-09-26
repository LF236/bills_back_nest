import { UuidGeneratorPort } from '../../domain/port/uuid-generator.port';
import { v4 as UUID } from 'uuid';
export class UuidAdapter implements UuidGeneratorPort {
    generate(): string {
        return UUID();
    }
}