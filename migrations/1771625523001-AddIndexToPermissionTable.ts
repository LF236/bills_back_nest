import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexToPermissionTable1771625523001 implements MigrationInterface {
	name = 'AddIndexToPermissionTable1771625523001'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE "person"
			ADD "person_type" varchar(255) NOT NULL DEFAULT 'physical'
		`);

		await queryRunner.query(`
			ALTER TABLE "person"
			ADD "company_name" varchar(255) NULL DEFAULT NULL
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE "person"
			DROP COLUMN "company_name"
		`);

		await queryRunner.query(`
			ALTER TABLE "person"
			DROP COLUMN "person_type"
		`);
	}

}
