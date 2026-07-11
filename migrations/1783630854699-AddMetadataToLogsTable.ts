import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMetadataToLogsTable1783630854699 implements MigrationInterface {
    name = 'AddMetadataToLogsTable1783630854699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "logs"
            ADD COLUMN "metadata" jsonb NOT NULL DEFAULT '{}'::jsonb
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "logs"
            DROP COLUMN "metadata"    
        `);
    }

}
