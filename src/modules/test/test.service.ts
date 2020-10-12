import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { Test } from './test.entity';

@Injectable()
export class TestService {
    constructor(
        @InjectRepository(Test)
        private readonly testRepository: Repository<Text>
    ) {}

    /**
     * 存储
     */
    async store(data) {
        const entity = await this.testRepository.create(data);
        await this.testRepository.save(entity);//将实体存储在数据库中
        return entity;
    }

    /**
     * 查询
     */
    async select() {
        const entites = await this.testRepository.find();
        return entites;
    }

    /**
     * 
     * @param id 查询指定id
     */
    async show(id: string) {
        const entity = await this.testRepository.findOne(id);
        return entity
    }

    /**
     * 更新
     */
    async update(id: string, data) {
        const result = await this.testRepository.update(id, data);
        return result;
    }

    /**
     * 删除指定id
     */
    async delect(id: string) {
        const result = await this.testRepository.delete(id);
        return result;
    }
}
