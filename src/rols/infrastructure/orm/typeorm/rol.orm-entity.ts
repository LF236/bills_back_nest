import { PermissionOrmEntity } from "src/permissions/infrastructure/orm/typeorm/permission.orm-entity";
import { UserOrmEntity } from "src/user/infrastructure/orm/typeorm/user.orm-entity";
import { Column, DeleteDateColumn, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'roles' })
@Index('uq_roles_name_active', ['name'], { unique: true, where: '"deleted_at" IS NULL' })
export class RolOrmEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({ nullable: true })
	description?: string;

	@Column({
		type: 'boolean',
		default: false
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
	
	@ManyToMany(() => UserOrmEntity, (user) => user.roles)
	users: UserOrmEntity[];

	
	@ManyToMany(() => PermissionOrmEntity, (permission) => permission.roles, { 
		cascade: ['insert', 'update'], 
	})
	@JoinTable()
	permissions?: PermissionOrmEntity[];	
}
