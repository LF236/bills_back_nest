import { RolOrmEntity } from "src/rols/infrastructure/orm/typeorm/rol.orm-entity";
import { Column, DeleteDateColumn, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'permissions' })
@Index('uq_permission_name_active', ['name'], { unique: true, where: '"deleted_at" IS NULL' })
export class PermissionOrmEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		type: 'varchar',
	})
	name: string;

	@Column({ 
		type: 'varchar',
		length: 255,
		nullable: true
	})
	description?: string;

	@Column({
		type: 'boolean',
		default: true
	})
	is_active: boolean;

	@Column({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
	})
	created_at: Date;

	@Column({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
	})
	updated_at: Date;

	@DeleteDateColumn({
		type: 'timestamp',
		nullable: true
	})
	deleted_at: Date | null;

	@ManyToMany(() => RolOrmEntity, (rol) => rol.permissions, { cascade: true })
	roles?: RolOrmEntity[];
}
