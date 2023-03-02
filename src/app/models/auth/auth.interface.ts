import { User } from "src/app/user/entities/user.entity";

export interface LoginInterface{
    access_token:string;
    user:User
}