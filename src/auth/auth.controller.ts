import {
  Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
import { AuthRequest } from './models/AuthRequest';
  
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() body: AuthRequest) {
      return this.authService.login(body);
    }
  }