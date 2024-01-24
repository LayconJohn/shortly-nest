import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { User } from 'src/users/entities/User';
import { AuthGuard } from '@nestjs/passport';
import { FindAllUrlsUseCase } from './usecases/find-all-urls.usecase';
import { ShortenUrlUseCase } from './usecases/shorten-url.usecase';
import { FindOneUrlUsecase } from './usecases/find-one-url.usecase';

@Controller('urls')
export class UrlsController {
  constructor(
    private readonly urlsService: UrlsService,
    private readonly findAllUrlsUseCase: FindAllUrlsUseCase,
    private readonly shortenUrlUseCase: ShortenUrlUseCase,
    private readonly findOneUrlUseCase: FindOneUrlUsecase
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
    return this.urlsService.remove(+id);
  }

  @Get('/open/:shortUrl')
  open(@Param('shortUrl') url: string){
    return this.urlsService.redirectUrl(url);
  }

  @Get('/ranking')
  ranking(){
    return this.urlsService.rankingUrls();
  }
}
