import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalStrategy } from './auth/strategies/jwt-payload';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { UrlsModule } from './urls/urls.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, UrlsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: LocalAuthGuard
    }
  ],
})
export class AppModule {}
