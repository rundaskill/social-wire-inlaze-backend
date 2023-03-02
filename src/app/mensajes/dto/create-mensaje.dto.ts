import { IsNotEmpty } from "class-validator";
import { User } from "src/app/user/entities/user.entity";

export class CreateMensajeDto {
    @IsNotEmpty()
    title:string;
    @IsNotEmpty()
    message: string

    user?:User
}
