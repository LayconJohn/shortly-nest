import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class GetRankingUseCase {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    execute() {
        return this.prismaService.urls.groupBy({
            by: 'userId',
            _sum: {
                visitCount: true
            },
            _count: {
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