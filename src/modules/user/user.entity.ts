import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

import * as bcrypt from 'bcrypt'
import { Exclude } from "class-transformer";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { unique: true})
    username: string

    @Column()
    @Exclude() //需要安装class-transformer包
    password: string

    @CreateDateColumn()
    createTime: Date;

    @CreateDateColumn()
    updateTime: Date;

    @BeforeInsert() //插入数据时自动执行
    @BeforeUpdate() //更新密码的时候
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }

    async comparePassword(password: string) {
        return await bcrypt.compare(password, this.password);
    }
} 