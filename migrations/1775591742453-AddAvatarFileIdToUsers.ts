import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAvatarFileIdToUsers1775591742453 implements MigrationInterface {
    name = 'AddAvatarFileIdToUsers1775591742453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD COLUMN "avatar_file_id" uuid,
            ADD CONSTRAINT fk_avatar_file_id FOREIGN KEY ("avatar_file_id") REFERENCES "file"("id") ON DELETE SET NULL
        `
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            DROP CONSTRAINT fk_avatar_file_id,
            DROP COLUMN "avatar_file_id"    
        `);
    }

}
