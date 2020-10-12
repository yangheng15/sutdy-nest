import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('article')
export class Test {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    @Column('longtext', { nullable: true})
    body: string

    @CreateDateColumn()
    createTime: Date;

    @CreateDateColumn()
    updateTime: Date;
} 