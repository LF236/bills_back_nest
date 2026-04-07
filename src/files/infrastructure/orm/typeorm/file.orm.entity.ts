import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'file' })
export class FileOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false
  })
  extension: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false
  })
  path: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false
  })
  type: string;

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
    nullable: true
  })
  deleted_at: Date | null;
}