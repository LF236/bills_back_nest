import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('logs')
export class LogOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  user_id?: string | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true
  })
  user_name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false
  })
  action: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false
  })
  module: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false
  })
  resource: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false
  })
  description: string;

  @Column({
    type: 'enum',
    enum: ['success', 'error', 'warning'],
    nullable: false
  })
  result: 'success' | 'error' | 'warning';

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true
  })
  message_error: string | null;
  
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true
  })
  ip: string | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true
  })
  user_agent: string | null;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: true
  })
  method_http: string | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true
  })
  route: string | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true
  })
  request_id: string | null;

  @Column({
    type: 'double precision',
    nullable: true
  })
  duration: number | null;

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
    type: 'varchar',
    nullable: true
  })
  browser: string | null;

  @Column({
    type: 'varchar',
    nullable: true
  })
  browser_version: string | null;

  @Column({
    type: 'varchar',
    nullable: true
  })
  os: string | null;

  @Column({
    type: 'varchar',
    nullable: true
  })
  device: string | null
}