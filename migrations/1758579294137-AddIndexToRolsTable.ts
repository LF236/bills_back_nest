import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexToRolsTable1758579294137 implements MigrationInterface {
    name = 'AddIndexToRolsTable1758579294137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "uq_roles_name_active"
            ON "roles" ("name")
            where "deleted_at" IS NULL
        `);
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."uq_roles_name_active"`);
    }

}
