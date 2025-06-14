import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Permission } from 'src/permissions/entities/permission.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'roles' })
@ObjectType()
export class Rol {
	@PrimaryGeneratedColumn('uuid')
	@Field(() => ID)
	id: string;

	@Column()
	@Field(() => String)
	name: string;

	@Column()
	@Field(() => String, { nullable: true })
	description?: string;

	@Column({
		type: 'boolean',
		default: false,
	})
	@Field(() => Boolean, { defaultValue: false })
	is_active: boolean;

	@Column({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
	})
	@Field(() => Date, { defaultValue: new Date() })
	created_at: Date;

	@Column({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
	})
	@Field(() => Date, { defaultValue: new Date() })
	updated_at: Date;

	@Column({
		type: 'timestamp',
		nullable: true,
		default: null,
	})
	@Field(() => Date, { nullable: true })
	deleted_at: Date | null;


	@ManyToMany(() => User, (user) => user.roles)
	users: User[];


	@ManyToMany(() => Permission, (permission) => permission.roles, {cascade: true, lazy: true})
	@JoinTable()
	@Field(() => [Permission], { nullable: true })
	permissions?: Permission[];	
}
