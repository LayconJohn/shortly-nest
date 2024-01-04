import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { isPublic } from './auth/decorator/is-public.decorator';
import { CurrentUser } from './auth/decorator/current-user.decorator';
import { User } from './users/entities/User';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @isPublic()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/me')
  getMe(@CurrentUser() currentUser: User) {
    return currentUser;
  }
}
