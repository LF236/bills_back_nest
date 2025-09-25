import { RolOrmEntity } from 'src/rols/infrastructure/orm/typeorm/rol.orm-entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserOrmEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	
	@Column({
		unique: true,
	})
	email: string;

	@Column({
		type: 'varchar',
		length: 255,
		nullable: false,
	})
	password: string;

	@Column({
		type: 'boolean',
		default: false,
	})
	is_active: boolean;

	@ManyToMany(() => RolOrmEntity, (rol) => rol.users, { eager: true, cascade: true, onDelete: 'CASCADE' })
	@JoinTable()
	roles: RolOrmEntity[];


	@Column({
		type: 'timestamp',
		nullable: true,
	})
	verified_at: Date | null;

	@Column({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP'
	})
	created_at: Date;

	@Column({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP'
	})
	updated_at: Date;

	@Column({
		type: 'timestamp',
		nullable: true,
	})
	deleted_at: Date | null;

}
