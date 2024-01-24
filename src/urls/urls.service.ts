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


}
