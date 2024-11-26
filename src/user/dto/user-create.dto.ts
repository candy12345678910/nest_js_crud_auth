import { IsEmail, IsNumber, IsString } from "class-validator";

export class UserDto{
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    class: string;

    @IsNumber()
    roll: number;

    password: string
}