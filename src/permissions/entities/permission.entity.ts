import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Rol } from 'src/rols/entities/rol.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

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


	@ManyToMany(() => Rol, (rol) => rol.permissions, {nullable: true, lazy: true})
	@Field(() => [Rol], { nullable: true })
	roles?: Rol[];

}
