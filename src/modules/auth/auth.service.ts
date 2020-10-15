import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';
import { JwtPayload } from './auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtServiece: JwtService
    ) {}

    async login(data) {
        const { username, password } = data;
        const entity = await this.userService.findByUsername(username);
        if(!entity) {
            throw new UnauthorizedException('当前用户不存在~')
        }

        if(!(await entity.comparePassword(password))) {
            throw new UnauthorizedException('密码不匹配！')
        }

        const { id } = entity;
        const payload = { id, username }
        const token = this.singToken(payload);
        return {
            ...payload,
            token
        }
    }



    /**
     * 
     * @param data 签发jwt 返回token
     */
    singToken(data: JwtPayload): string {
        return this.jwtServiece.sign(data);
    }
}
