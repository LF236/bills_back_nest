import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
	@PrimaryGeneratedColumn('uuid')
	@Field(() => ID)
	id: string;
	
	@Column({
		unique: true,
	})
	@Field(() => String)
	email: string;

	@Column({
		type: 'varchar',
		length: 255,
		nullable: false,
	})
	password: string;

}
