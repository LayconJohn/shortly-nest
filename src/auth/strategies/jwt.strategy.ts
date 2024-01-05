import { Injectable, UnauthorizedException  } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/User';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './jwt-payload';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}