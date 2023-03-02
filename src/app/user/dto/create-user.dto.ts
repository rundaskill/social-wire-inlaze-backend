import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
    MinLength,
  } from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty()
    user: string;

    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}
