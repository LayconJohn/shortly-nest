import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUrlDto } from "../dto/create-url.dto";
import { nanoid } from "nanoid";

@Injectable()
export class ShortenUrlUseCase {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    execute(input: CreateUrlDto, id: number) {
        const shortUrl = nanoid(10);
        return this.prismaService.urls.create({
            data: {
                ...input,
                shortUrl,
                userId: id
            }
        })
    }
}