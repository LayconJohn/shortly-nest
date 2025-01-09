import { Injectable } from "@nestjs/common";
import { NotFoundError } from "src/infra/utils/errors/index";
import { PrismaService } from "src/infra/prisma/prisma.service";

@Injectable()
export class RemoveUrlUseCase {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async execute(id: number) {
        const url = await this.prismaService.urls.findFirst({ where: { id } });
        if (!url) throw new NotFoundError("Url not found");

        return this.prismaService.urls.delete({ where: { id } })
    }
}