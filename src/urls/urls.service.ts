import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { nanoid } from 'nanoid';
import { NotFoundError } from 'src/errors/index';

@Injectable()
export class UrlsService {
  constructor(
    private readonly prismaService: PrismaService
  ){}

  shortenUrl(createUrlDto: CreateUrlDto, userId: number) {
    const shortUrl = nanoid(10); //TO-DO:Ver BO de importação
    return this.prismaService.urls.create({
      data: {
        ...createUrlDto,
        shortUrl,
        userId
      }
    })
  }

  findAll(id: number) {
    return this.prismaService.urls.findMany({
      where: {
        userId: id
      }
    });
  }

  async findOne(id: number) {
    const url = await this.prismaService.urls.findUnique({
      where: {
        id
      }
    });
    
    if(!url) {
      throw new NotFoundError("Url not found");
    }

    return {
      id,
      shortUrl: url.shortUrl,
      url: url.url
    }
  }

  update(id: number, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
