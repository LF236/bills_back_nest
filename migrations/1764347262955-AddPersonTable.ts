import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPersonTable1764347262955 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			CREATE TYPE "person_sex_enum" AS ENUM ('M', 'F', '0')	
		`);

		await queryRunner.query(`
			CREATE TABLE "person" (
				"id" uuid NOT NULL DEFAULT uuid_generate_v4(),
				"first_name" character varying NOT NULL,
				"last_name" character varying NOT NULL,
				"second_last_name" character varying,
				"sex" "person_sex_enum" NOT NULL,
				"birth_date" TIMESTAMP NOT NULL,
				"curp" character varying,
				"rfc" character varying,
				"created_at" TIMESTAMP NOT NULL DEFAULT now(),
				"updated_at" TIMESTAMP NOT NULL DEFAULT now(),
				"deleted_at" TIMESTAMP,
				CONSTRAINT "PK_5e3fbd4c0f7c3b2f5e5f5f5f5f5" PRIMARY KEY ("id")
			)
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TYPE "person_sex_enum"`);
		await queryRunner.query(`DROP TABLE "person"`);
	}
}
