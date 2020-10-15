import { Body, ClassSerializerInterceptor, Controller, Get, Post, Req, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthUser } from 'src/core/decorators/authUser.decorator';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    async login(@Body() data: LoginDto) {
        return this.authService.login(data)
    }

    @Get('test')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(ClassSerializerInterceptor)
    async authTest(@AuthUser() user) {
        return user
    }

    
}

