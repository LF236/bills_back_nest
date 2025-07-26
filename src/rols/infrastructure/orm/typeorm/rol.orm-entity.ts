import { PermissionOrmEntity } from "src/permissions/infrastructure/orm/typeorm/permission.orm-entity";
import { UserOrmEntity } from "src/user/infrastructure/orm/typeorm/user.orm-entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'roles' })
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

	@Column({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
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
