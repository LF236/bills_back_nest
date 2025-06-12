import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

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

	@ManyToMany(() => User, (user) => user.roles)
	users: User[];
}
