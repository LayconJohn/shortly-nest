import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../services/users/users.module';
import { PrismaModule } from '../infra/prisma/prisma.module';
import { AuthModule } from '../infra/utils/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { UrlsModule } from '../services/urls/urls.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, UrlsModule],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
