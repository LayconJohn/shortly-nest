import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FindAllUrlsUseCase } from './usecases/find-all-urls.usecase';

@Module({
  imports: [PrismaModule],
  controllers: [UrlsController],
  providers: [UrlsService, FindAllUrlsUseCase],
})
export class UrlsModule {}
