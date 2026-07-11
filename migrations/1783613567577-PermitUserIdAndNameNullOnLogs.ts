import { MigrationInterface, QueryRunner } from "typeorm";

export class PermitUserIdAndNameNullOnLogs1783613567577 implements MigrationInterface {
    name = 'PermitUserIdAndNameNullOnLogs1783613567577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "logs"
            ADD COLUMN "browser" character varying,
            ADD COLUMN "browser_version" character varying,
            ADD COLUMN "os" character varying,
            ADD COLUMN "device" character varying
        `);

        await queryRunner.query(`
            ALTER TABLE "logs"
            ALTER COLUMN "user_id" DROP NOT NULL,
            ALTER COLUMN "user_name" DROP NOT NULL    
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "logs"
            DROP COLUMN "browser",
            DROP COLUMN "browser_version",
            DROP COLUMN "os",
            DROP COLUMN "device"
        `);

        await queryRunner.query(`
            ALTER TABLE "logs"
            ALTER COLUMN "user_id" SET NOT NULL,
            ALTER COLUMN "user_name" SET NOT NULL    
        `);
    }

}