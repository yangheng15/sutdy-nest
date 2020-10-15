import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifyCallback } from "passport-jwt";
import { UserService } from "src/modules/user/user.service";
import { JwtPayload } from "../auth.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'qwerourietpecxasdlkjcpoiqlkhdasas'
        })
    }

    async validate(payload: JwtPayload, done: VerifyCallback) {
        // console.log(payload); 如果当前payload存在说明验证token通过
        const { username } = payload;
        const entity = await this.userService.findByUsername(username);
        if(!entity) {
            new UnauthorizedException('当前用户不存在'), null
        }
        // console.log(entity);
        return entity;
        // return done(null, () => entity)
    }
    
}