import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FindAllUrlsUseCase {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    execute(id: number) {
        return this.prismaService.urls.findMany({
            where: {userId: id}
        })
    }
}