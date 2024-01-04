import { PartialType } from "@nestjs/mapped-types";
import { Url } from "../entities/url.entity";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUrlDto extends PartialType(Url){
    @IsString()
    @IsNotEmpty()
    url: string;
}
