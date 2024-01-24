import { Injectable } from "@nestjs/common";
import { NotFoundError } from "src/errors/index";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RedirectUrlUseCase {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async execute(url: string){
        const reqUrl = await this.prismaService.urls.findFirst({ where: {shortUrl: url} });
        if (!reqUrl) throw new NotFoundError("Url not found");

        return this.prismaService.urls.update({
            where: { id: reqUrl.id },
            data: {
                visitCount: reqUrl.visitCount + 1
            }
        });
    }
}