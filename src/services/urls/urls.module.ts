import { Module } from '@nestjs/common';
import { UrlsController } from './urls.controller';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { FindAllUrlsUseCase } from './usecases/find-all-urls.usecase';
import { ShortenUrlUseCase } from './usecases/shorten-url.usecase';
import { FindOneUrlUsecase } from './usecases/find-one-url.usecase';
import { RemoveUrlUseCase } from './usecases/remove-url.usecase';
import { RedirectUrlUseCase } from './usecases/redirect-url.usecase';
import { GetRankingUseCase } from './usecases/get-ranking.usecase';

@Module({
  imports: [PrismaModule],
  controllers: [UrlsController],
  providers: [
    FindAllUrlsUseCase,
    ShortenUrlUseCase,
    FindOneUrlUsecase,
    RemoveUrlUseCase,
    RedirectUrlUseCase,
    GetRankingUseCase,
  ],
})
export class UrlsModule {}
