import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    email: string;

    @MaxLength(30)
    @MinLength(8)
    @IsString()
    @IsNotEmpty()
    password: string;
}
