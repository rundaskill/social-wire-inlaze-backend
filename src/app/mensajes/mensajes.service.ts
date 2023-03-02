import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { UpdateMensajeDto } from './dto/update-mensaje.dto';
import { Mensaje } from './entities/mensaje.entity';
import { ILike } from "typeorm"
import { FiltroMensajeDto } from './dto/filtro-mensaje.dto';
import { User } from '../user/entities/user.entity';
@Injectable()
export class MensajesService {
  constructor(@InjectRepository(Mensaje)
  private messageRepository: Repository<Mensaje>) {
  }
  create(createMensajeDto: CreateMensajeDto) {
    const addMessage=this.messageRepository.create(createMensajeDto)
    return this.messageRepository.save(addMessage).then((message)=>{
      return {
        message: 'Se creó el mensaje',
        dato: message,
        created: true,
      }
    }).catch(() => {
      throw new BadRequestException(`No se pudo crear el mensaje`);
    });
  }

  findAll() {
    return this.messageRepository.find({
      relations:{
        user:true
      }      
    });
  }
  findFilter(filtro:FiltroMensajeDto){
    return this.messageRepository.createQueryBuilder("mensaje")
    .leftJoinAndSelect("mensaje.user", "user").where("mensaje.title like :title",{
      title:`%${filtro.title}%`
    }).orWhere("CONVERT(mensaje.creado_at,char) like :creado_at",{
      creado_at:`%${filtro.creado_at}%`
    }).getMany()
  }
  findMeMensaje(user:any) {
    return this.messageRepository.createQueryBuilder("mensaje")
    .leftJoinAndSelect("mensaje.user", "user")
    .where("user.id = :userId",{
      userId:user.id
    }).getMany()
  }
  findMeMensajeFiltro(user:any,creado_at){
    return this.messageRepository.createQueryBuilder("mensaje")
    .leftJoinAndSelect("mensaje.user", "user")
    .where("user.id = :userId",{
      userId:user.id
    }).where("CONVERT(mensaje.creado_at,char) like :creado_at",{
      creado_at:`%${creado_at}%`
    }).getMany()
  }

  update(id: number, updateMensajeDto: UpdateMensajeDto) {
    return `This action updates a #${id} mensaje`;
  }

  remove(id: number) {
    return `This action removes a #${id} mensaje`;
  }
}
