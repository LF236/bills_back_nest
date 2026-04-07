import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFileTable1775588256092 implements MigrationInterface {
    name = 'CreateFileTable1775588256092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "file" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "extension" character varying NOT NULL,
                "path" character varying NOT NULL,
                "type" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT pk_file_id PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "file"`);
    }

}
