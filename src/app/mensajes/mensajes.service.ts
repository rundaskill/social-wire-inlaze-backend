import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { UpdateMensajeDto } from './dto/update-mensaje.dto';
import { Mensaje } from './entities/mensaje.entity';
import { ILike } from "typeorm"
import { FiltroMensajeDto } from './dto/filtro-mensaje.dto';
import { User } from '../user/entities/user.entity';
import { HttpGood } from '../models/http/http.interface';
@Injectable()
export class MensajesService {
  constructor(@InjectRepository(Mensaje)
  private messageRepository: Repository<Mensaje>) {
  }
  /**
   * Metodo para crear un mensaje
   * @param createMensajeDto CreateMensajeDto
   * @returns Promise<HttpGood<Mensaje>|BadRequestException>
   */
  create(createMensajeDto: CreateMensajeDto):Promise<HttpGood<Mensaje>|BadRequestException> {
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

  /**
   * Metodo para buscar todos los mensaje con su usuario
   * y lo organiza decendiente de la fecha de creacion
   * @returns Promise<Mensaje[]> 
   */
  findAll():Promise<Mensaje[]> {
    return this.messageRepository.find({
      relations:{
        user:true
      },
      order:{
        creado_at:"DESC"
      }      
    });
  }
  /**
   * Metodo para filtrar los mensajes y los organiza decente a la fecha de creacion
   * @param filtro FiltroMensajeDto
   * @returns Promise<Mensaje[]>
   */
  findFilter(filtro:FiltroMensajeDto):Promise<Mensaje[]>{
    return this.messageRepository.createQueryBuilder("mensaje")
    .leftJoinAndSelect("mensaje.user", "user").where("mensaje.title like :title",{
      title:`%${filtro.title}%`
    }).orWhere("CONVERT(mensaje.creado_at,char) like :creado_at",{
      creado_at:`%${filtro.creado_at}%`
    }).orderBy("mensaje.creado_at","DESC").getMany()
  }
  /**
   * Metodo para obtener todo los mensaje del usuario
   * que tiene la sección  activa
   * @param user User
   * @returns Promise<Mensaje[]>
   */
  findMeMensaje(user:any):Promise<Mensaje[]> {
    return this.messageRepository.createQueryBuilder("mensaje")
    .leftJoinAndSelect("mensaje.user", "user")
    .where("user.id = :userId",{
      userId:user.id
    }).orderBy("mensaje.creado_at","DESC").getMany()
  }
  /**
   * Metodo para filtrar por fecha de creacion los mensajes del 
   * usuario que tiene la sección  activa
   * @param user User
   * @returns Promise<Mensaje[]>
   */
  findMeMensajeFiltro(user:any,creado_at):Promise<Mensaje[]>{
    return this.messageRepository.createQueryBuilder("mensaje")
    .leftJoinAndSelect("mensaje.user", "user")
    .where("user.id = :userId",{
      userId:user.id
    }).where("CONVERT(mensaje.creado_at,char) like :creado_at",{
      creado_at:`%${creado_at}%`
    }).orderBy("mensaje.creado_at","DESC").getMany()
  }

  update(id: number, updateMensajeDto: UpdateMensajeDto) {
    return `This action updates a #${id} mensaje`;
  }
}
