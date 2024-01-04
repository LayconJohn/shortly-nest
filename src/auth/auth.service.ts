import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/User';
import { UsersService } from 'src/users/users.service';
import { UserPayload } from './models/UserPayload';
import * as bcrypt from "bcrypt"
import { UnauthorzedError } from 'src/errors/index';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) {}

    async login(user: User): Promise<UserToken> {
        const payload: UserPayload = {
            sub: user?.id,
            email: user?.email,
            name: user?.name
        };

        return {
            token: this.jwtService.sign(payload)
        }
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.usersService.findByEmail(email);

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password)

            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined
                }
            }
        }

        throw new UnauthorzedError('Email address or password provided is incorrect.')
    }
}
