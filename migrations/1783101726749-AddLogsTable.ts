import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLogsTable1783101726749 implements MigrationInterface {
    name = 'AddLogsTable1783101726749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "result_enum" AS ENUM ('success', 'error', 'warning')
        `);


        await queryRunner.query(`
            CREATE TABLE "logs" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "user_id" uuid NOT NULL,
                "user_name" character varying NOT NULL,
                "action" character varying NOT NULL,
                "module" character varying NOT NULL,
                "resource" character varying NOT NULL,
                "description" character varying NOT NULL,
                "result" "result_enum" NOT NULL,
                "message_error" character varying,
                "ip" character varying,
                "user_agent" character varying,
                "method_http" character varying,
                "route" character varying,
                "request_id" character varying,
                "duration" double precision,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT pk_logs_id PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "logs"`);
        await queryRunner.query(`DROP TYPE "result_enum"`);
    }

}
