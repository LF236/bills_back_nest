import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteOnCascade1752715491463 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_b2f0366aa9349789527e0c36d97"`);

        // Vuelve a crear la FK con ON DELETE CASCADE
        await queryRunner.query(`
          ALTER TABLE "users_roles_roles"
          ADD CONSTRAINT "FK_b2f0366aa9349789527e0c36d97"
          FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_b2f0366aa9349789527e0c36d97"`);

        await queryRunner.query(`
          ALTER TABLE "users_roles_roles"
          ADD CONSTRAINT "FK_b2f0366aa9349789527e0c36d97"
          FOREIGN KEY ("rolesId") REFERENCES "roles"("id")
        `);
	}

}
