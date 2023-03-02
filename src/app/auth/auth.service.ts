import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginInterface } from '../models/auth/auth.interface';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';


@Injectable()
export class AuthService {
  constructor(private usersService: UserService,
    private jwtService: JwtService
   ){

  }
  /**
   * Validar usuario
   * Busca el usuario por el correo y valida si la contraseña es igual
   * @param login LoginAuthDto
   * @returns Promise<LoginInterface|BadRequestException>
   */
  validateUser(login:LoginAuthDto):Promise<LoginInterface|BadRequestException>{
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
  /**
   * Genera el token del usaurio
   * @param user User
   * @returns LoginInterface
   */
  generateToken(user: User):LoginInterface {
    const { password, ...userData } = user;
    const payload = { ...userData, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user:userData
    };
  }
}
