import { User } from 'src/modules/auth/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BlogStatus } from '../enums/BlogStatus.enum';

@Entity('blogs')
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    content: string;

    @Column({
        type: 'enum',
        enum: BlogStatus,
        default: BlogStatus.DRAFT
    })
    status: BlogStatus;

    @Column({ nullable: true })
    imageUrl: string;
    
    @Column({ name: 'author_id' })
    authorId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'author_id' })
    author: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}