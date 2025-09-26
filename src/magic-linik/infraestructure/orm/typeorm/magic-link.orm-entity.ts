import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'magic_link' })
export class MagicLinkOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        unique: true,
    })
    token: string;
    
    @Column({
        type: 'uuid'
    })
    user_id: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_at: Date;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    expires_at: Date;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    used_at: Date | null;
}