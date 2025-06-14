import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationsToRolePermissions1749885008945 implements MigrationInterface {
    name = 'AddRelationsToRolePermissions1749885008945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "permissionsId" uuid`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "FK_5ea21b9810557dfe6895f7e990c" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_5ea21b9810557dfe6895f7e990c"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "permissionsId"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "created_at"`);
    }

}
