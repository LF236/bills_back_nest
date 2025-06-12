import { MigrationInterface, QueryRunner } from "typeorm";

export class AddActiveFieldOnTableUsers1749691395049 implements MigrationInterface {
    name = 'AddActiveFieldOnTableUsers1749691395049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "is_active" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_active"`);
    }

}
