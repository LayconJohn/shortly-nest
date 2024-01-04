import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/User';
import { UsersService } from 'src/users/users.service';
import { UserPayload } from './models/UserPayload';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) {}

    async login(user: User) {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name
        };

        return {
            token: this.jwtService.sign(payload)
        }
    }
}
