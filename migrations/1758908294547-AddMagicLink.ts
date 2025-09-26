import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMagicLink1758908294547 implements MigrationInterface {
    name = 'AddMagicLink1758908294547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "magic_link" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "expires_at" TIMESTAMP, "used_at" TIMESTAMP, CONSTRAINT "UQ_d0357b0c636cfa2eb4f6263df05" UNIQUE ("token"), CONSTRAINT "PK_4fac5105519c1ac3e645d7f9416" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "magic_link"`);
    }

}
