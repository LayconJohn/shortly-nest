import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { User } from 'src/services/users/entities/User';
import { AuthGuard } from '@nestjs/passport';
import { FindAllUrlsUseCase } from './usecases/find-all-urls.usecase';
import { ShortenUrlUseCase } from './usecases/shorten-url.usecase';
import { FindOneUrlUsecase } from './usecases/find-one-url.usecase';
import { RemoveUrlUseCase } from './usecases/remove-url.usecase';
import { RedirectUrlUseCase } from './usecases/redirect-url.usecase';
import { GetRankingUseCase } from './usecases/get-ranking.usecase';

@Controller('urls')
export class UrlsController {
  constructor(
    private readonly findAllUrlsUseCase: FindAllUrlsUseCase,
    private readonly shortenUrlUseCase: ShortenUrlUseCase,
    private readonly findOneUrlUseCase: FindOneUrlUsecase,
    private readonly removeUrlUseCase: RemoveUrlUseCase,
    private readonly redirectUrlUseCase: RedirectUrlUseCase,
    private readonly getRankingUseCase: GetRankingUseCase
    ) {}

  @Post('/shorten')
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createUrlDto: CreateUrlDto, @Request() req: any) {
    return this.shortenUrlUseCase.execute(createUrlDto, +req.user.id);
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  findAll( @Request() req: any) {
    const id: number = req.user.id    
    return this.findAllUrlsUseCase.execute(+id);
  }

  @Get('/select/:id')
  findOne(@Param('id') id: string) {
    return this.findOneUrlUseCase.execute(+id);
  }

  @Delete('/remove/:id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.removeUrlUseCase.execute(+id);
  }

  @Get('/open/:shortUrl')
  open(@Param('shortUrl') url: string){
    return this.redirectUrlUseCase.execute(url);
  }

  @Get('/ranking')
  ranking(){
    return this.getRankingUseCase.execute();
  }
}
