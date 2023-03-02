import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HttpGood } from '../models/http/http.interface';
@Injectable()
export class UserService {
  
  constructor(@InjectRepository(User)
  private usersRepository: Repository<User>) {
  }
  /**
   * Crear un usuario en el sistema
   * @returns BadRequestException
   */
  async create(crearUsuarioDto:CreateUserDto):Promise<BadRequestException | HttpGood<User>>{
  
      const addUser= this.usersRepository.create(crearUsuarioDto)
      return this.usersRepository.save(addUser).then<any|BadRequestException>(()=>{
        const {password,...user}=addUser;
        return {
          message: 'Se creó el usuario',
          dato: user,
          created: true,
        }
      })
      .catch(() => {
        throw new BadRequestException(`La cuenta con este correo electrónico ya existe.`);
      });
    
   
  }
  /**
   *  Buscar todos los usuarios
   * @returns Promise<User[]>
   */
  findAll():Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(email: string):Promise<User> {
   return this.usersRepository.findOneBy({email})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
