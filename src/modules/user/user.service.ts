import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { UpdatePasswordDto, UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    /**
     * 存储用户
     */
    async store(data) {
        const { username } = data;
        const user = await this.userRepository.findOne({ username }) //对应的key是数据库的字段名，value是字段的值
        console.log(user);
        if (user) {
            throw new BadRequestException('用户已存在～')
        }


        const entity = this.userRepository.create(data);
        return this.userRepository.save(entity);
    }

    /**
     * 查询指定用户
     */


    async show(username: string) {
        console.log(username);

        const entity = await this.userRepository.findOne({ username })
        console.log(entity);

        if (!entity) {
            throw new NotFoundException('当前用户不存在🦖')
        }

        return entity;
    }


    /**
     * 更新密码
     */

    async updatePassword(username: string, data: UpdatePasswordDto) {
        const { password, newPassword } = data;
        const entity = await this.userRepository.findOne({ username })
        if (!entity) {
            throw new NotFoundException('当前用户不存在')
        }

        const pass = await entity.comparePassword(password)
        if (!pass) {
            throw new BadRequestException('密码验证失败')
        }

        entity.password = newPassword;
        return await this.userRepository.save(entity);
    }

    async findByUsername(username: string) {
        return this.userRepository.findOne({ username })
    }
}
