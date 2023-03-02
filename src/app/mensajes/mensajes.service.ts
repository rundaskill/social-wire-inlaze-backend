import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { UpdateMensajeDto } from './dto/update-mensaje.dto';
import { Mensaje } from './entities/mensaje.entity';

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

  findOne(id: number) {
    return `This action returns a #${id} mensaje`;
  }

  update(id: number, updateMensajeDto: UpdateMensajeDto) {
    return `This action updates a #${id} mensaje`;
  }

  remove(id: number) {
    return `This action removes a #${id} mensaje`;
  }
}
