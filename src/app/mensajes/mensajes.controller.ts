import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards ,Request,Query} from '@nestjs/common';
import { MensajesService } from './mensajes.service';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { UpdateMensajeDto } from './dto/update-mensaje.dto';
import { JwtAuthGuard } from '../guards/auth/jwt-auth.guard';
import { FiltroMensajeDto } from './dto/filtro-mensaje.dto';
import { User } from '../user/entities/user.entity';


@Controller('mensajes')
export class MensajesController {
  constructor(private readonly mensajesService: MensajesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMensajeDto: CreateMensajeDto,@Request() req) {    
    return this.mensajesService.create({...createMensajeDto,user:req.user});
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() params:{title:string,creado_at:string}) {
    if (params?.title || params?.creado_at) {
      return this.mensajesService.findFilter(params);
    } 
    return this.mensajesService.findAll();

  }
  @UseGuards(JwtAuthGuard)
  @Get("me")
  findMeMensajes(@Request() req){
    console.log(req.user);
    
    return this.mensajesService.findMeMensaje(req.user)
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.mensajesService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMensajeDto: UpdateMensajeDto) {
    return this.mensajesService.update(+id, updateMensajeDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mensajesService.remove(+id);
  // }
}
