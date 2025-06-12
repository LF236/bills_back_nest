import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'permissions' })
@ObjectType()
export class Permission {
	@PrimaryGeneratedColumn('uuid')
 	@Field(() => ID)
	id: string;

	@Column({
		unique: true,
	})
	@Field(() => String)
	name: string;

	@Column({
		type: 'varchar',
		length: 255,
		nullable: true,
	})
	@Field(() => String, { nullable: true })
	description?: string;

	@Column({
		type: 'boolean',
		default: true,
	})
	@Field(() => Boolean, { defaultValue: true })
	is_active: boolean;
}
