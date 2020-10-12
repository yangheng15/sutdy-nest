import { Body, Controller, Get, Post, SetMetadata, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCatDto } from 'src/cats/dao';
import { AuthGuard } from '../auth/auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { PostService } from '../service/post.service';

@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService) {}

    @Get()
    getAll() {
        return this.postService.findAll()
    }

    @Post('insert')
    @UseGuards(DemoGuard)
    @UsePipes(ValidationPipe)
    @SetMetadata('role', ['member']) // 中间件-> 守卫 -> 管道 -> 
    insert(@Body() createPostDto: CreateCatDto) {
        console.log(createPostDto);
        this.postService.create(createPostDto)
    }

    @Post('login')
    @UseGuards(AuthGuard)
    login():object {
        return {
            status: '成功'
        }
    }
}
