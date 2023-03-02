import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards ,Request,Query} from '@nestjs/common';
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
  findMeMensajes(@Query() params:{creado_at:string},@Request() req){
    if (params?.creado_at) {
      return this.mensajesService.findMeMensajeFiltro(req.user,params?.creado_at);
    } 
    return this.mensajesService.findMeMensaje(req.user)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMensajeDto: UpdateMensajeDto) {
    return this.mensajesService.update(+id, updateMensajeDto);
  }

}
