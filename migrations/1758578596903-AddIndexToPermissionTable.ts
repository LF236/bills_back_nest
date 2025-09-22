import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexToPermissionTable1758578596903 implements MigrationInterface {
    name = 'AddIndexToPermissionTable1758578596903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE UNIQUE INDEX "uq_permission_name_active"
            ON "permissions" ("name")
            WHERE "deleted_at" IS NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."uq_permission_name_active"`);
    }

}
