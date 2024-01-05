import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { User } from 'src/users/entities/User';
import { AuthGuard } from '@nestjs/passport';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post('/shorten')
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createUrlDto: CreateUrlDto, @Request() req: any) {
    return this.urlsService.shortenUrl(createUrlDto, req.user.id);
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  findAll( @Request() req: any) {
    const id: number = req.user.id    
    return this.urlsService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urlsService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.urlsService.remove(+id);
  }
}
