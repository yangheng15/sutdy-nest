import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostDto } from './test.dto';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
    constructor(
        private readonly testService: TestService
    ) {}


    @Post('insert')
    async stroe(@Body() data: PostDto) {
        return await this.testService.store(data);
    }

    @Get('select')
    async select() {
        return await this.testService.select();
    }

    @Get(':id')
    async show(@Param('id') id:string) {
        return await this.testService.show(id);
    }

    @Put(':id')
    async updata(@Param('id') id: string, @Body() data: Partial<PostDto>) { //不分的dto，参数可以是可选的
        return await this.testService.update(id, data);
    }

    @Delete(':id')
    async delect(@Param('id') id: string) {
        return await this.testService.delect(id);
    }
}
