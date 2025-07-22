import { Rol } from 'src/rols/entities/rol.entity';
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

	@ManyToMany(() => Rol, (rol) => rol.users, { eager: true, cascade: true, onDelete: 'CASCADE' })
	@JoinTable()
	roles: Rol[];
}
