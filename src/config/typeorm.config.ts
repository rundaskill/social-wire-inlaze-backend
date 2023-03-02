import {  ConfigService } from "@nestjs/config"
import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { Mensaje } from "src/app/mensajes/entities/mensaje.entity"
import { User } from "src/app/user/entities/user.entity"



export default class TypeOrmConfig {
    static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {

        return {
            type: 'mysql',
            host: configService.get<string>('MYSQL_HOST_DM'),
            port: Number(configService.get<number>('MYSQL_PORT_DM')),
            database: configService.get<string>('MYSQL_DATABASE_NAME_DM'),
            username: configService.get<string>('MYSQL_ROOT_USER_DM'),
            password: configService.get<string>('MYSQL_ROOT_PASSWORD_DM'),
            entities: [User,Mensaje],
            synchronize: true,
            retryAttempts: 3,
            retryDelay: 3000,
            logging: false
        }
    }
}
