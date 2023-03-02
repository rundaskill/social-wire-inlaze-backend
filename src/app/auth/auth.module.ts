import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import {JwtStrategy} from './jwt/jwt.strategy'
import { ConfigModule } from '@nestjs/config';
@Module({
  imports:[
    ConfigModule.forRoot(),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
