import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards ,Request} from '@nestjs/common';
import { MensajesService } from './mensajes.service';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { UpdateMensajeDto } from './dto/update-mensaje.dto';
import { JwtAuthGuard } from '../guards/auth/jwt-auth.guard';

@Controller('mensajes')
export class MensajesController {
  constructor(private readonly mensajesService: MensajesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMensajeDto: CreateMensajeDto,@Request() req) {    
    return this.mensajesService.create({...createMensajeDto,user:req.user});
  }

  @Get()
  findAll() {
    return this.mensajesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mensajesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMensajeDto: UpdateMensajeDto) {
    return this.mensajesService.update(+id, updateMensajeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mensajesService.remove(+id);
  }
}
