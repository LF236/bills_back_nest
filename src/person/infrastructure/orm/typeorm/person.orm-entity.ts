import { UserOrmEntity } from 'src/user/infrastructure/orm/typeorm/user.orm-entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'person' })
export class PersonOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  first_name: string;

  @Column({ type: 'varchar', length: 100 })
  last_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  second_last_name: string;
  
  @Column({ type: 'enum', enum: ['M', 'F', '0'], nullable: true })
  sex: 'M' | 'F' | '0' | null;
  
  @Column({ type: 'date', nullable: true })
  birth_date: Date | null;

  @Column( { type: 'varchar', length: 100, nullable: true })
  curp: string | null;

  @Column( { type: 'varchar', length: 100, nullable: true })
  rfc: string | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })  
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date | null;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @OneToOne(() => UserOrmEntity, (user) => user.person)
  @JoinColumn({ name: 'user_id' })
  user: UserOrmEntity;
}