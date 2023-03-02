import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';


@Injectable()
export class AuthService {
  constructor(private usersService: UserService,
    private jwtService: JwtService
   ){

  }
  validateUser(login:LoginAuthDto){
    const msError="Correo o contraseña incorrecta"
    return this.usersService.findOne(login.email).then((user)=>{
      if (user.password===login.password) {
        return this.generateToken(user);
      }
      throw new BadRequestException(msError);
    }).catch(()=>{
      throw new BadRequestException(msError);
    })
  }
  generateToken(user: User) {
    const { password, ...userData } = user;
    const payload = { ...userData, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user:userData
    };
  }
}
