import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/User';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt"
import { UnauthorizedError } from '../errors/index';


@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) {}

    async validateUser(email: string, password: string): Promise<{access_token: string}> {
        const user = await this.usersService.findByEmail(email);

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password)

            if (isPasswordValid) {
                return await this.generateToken(user)
            }
        }

        throw new UnauthorizedError('Email address or password provided is incorrect.')
    }

    async generateToken(payload: User) {
        return {
            access_token: this.jwtService.sign(
                {email: payload.email},
                {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '10d'
                }
            )
        }
    }
}
