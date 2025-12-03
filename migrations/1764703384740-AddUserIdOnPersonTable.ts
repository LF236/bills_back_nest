import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserIdOnPersonTable1764703384740 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE person ADD COLUMN user_id UUID`);

		await queryRunner.query(`
            ALTER TABLE person
            ADD CONSTRAINT FK_person_user
            FOREIGN KEY (user_id)
            REFERENCES "users"(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE person DROP CONSTRAINT FK_person_user`);
		await queryRunner.query(`ALTER TABLE person DROP COLUMN user_id`);
	}

}
