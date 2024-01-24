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

  async remove(id: number) {
    const url = await this.prismaService.urls.findFirst({where: {id}})
    if (!url) {
      throw new NotFoundError("Url not found");
    }

    return this.prismaService.urls.delete({where: {id}})
  }

  async redirectUrl(url: string){
    const reqUrl = await this.prismaService.urls.findFirst({where: {shortUrl: url}});
    if (!reqUrl) {
      throw new NotFoundError("Url not found");
    }

    return this.prismaService.urls.update({
      where: {
        id: reqUrl.id
      },
      data: {
        visitCount: reqUrl.visitCount + 1
      }
    })
  }

  async rankingUrls() {
    const urls = await this.prismaService.urls.findMany({
      include: {
        users: {
          select: {
            name: true
          }
        }
      }
    })


    const aggregate = await this.prismaService.urls.aggregate({
      _count: {
        id: true,
      },
      _sum: {
        visitCount: true
      },
      orderBy: {
        visitCount: 'desc'
      },
      take: 10,
    })

    const query = `
    SELECT
    users.id,
    users.name,
    COUNT(urls.id) AS "linksCount",
    SUM(urls."visitCount") AS "visitCount"
    FROM users
    JOIN urls ON users.id = urls."userId"
    GROUP BY users.id ORDER BY "visitCount" DESC
    LIMIT 10
    `

    return this.prismaService.urls.groupBy({
      by: 'userId',
      _sum: {
        visitCount: true,
      },
      _count:{
        url: true
      },
      orderBy: {
        _sum: {
          visitCount: 'desc'
        }
      },
      take: 10
    })

  }
}
