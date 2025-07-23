import { RolOrmEntity } from "src/rols/infrastructure/orm/typeorm/rol.orm-entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'permissions' })
export class PermissionOrmEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		unique: true
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

	@Column({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
	})
	deleted_at: Date | null;

	@ManyToMany(() => RolOrmEntity, (rol) => rol.permissions, { cascade: true, lazy: true })
	roles?: RolOrmEntity[];
}
