import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({ //签发jwt
      secretOrPrivateKey: 'qwerourietpecxasdlkjcpoiqlkhdasas',
      signOptions: {
        expiresIn: '12h', //有效默认时间秒 也可以写 12h 小时 
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt '
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
