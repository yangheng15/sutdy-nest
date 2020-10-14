import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Put, Query, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UpdatePasswordDto, UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    async insert(@Body() data: UserDto) {
        return this.userService.store(data);
    }

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    async show(@Query('username') username: string) {
        return this.userService.show(username);
    }

    @Put()
    @UseInterceptors(ClassSerializerInterceptor)
    async updatePassword(@Query() data: UpdatePasswordDto) {
        const { username, password, newPassword } = data;
        return this.userService.updatePassword(username, data)
    }
}
