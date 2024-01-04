import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

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
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @MaxLength(30)
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    @IsString()
    @IsNotEmpty()
    confirmPassword: string;
}
