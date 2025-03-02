import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from '../app/app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  getMe(@Request() req: any): string {
    return {
      ...req.user,
      password: undefined
    };
  }
}
