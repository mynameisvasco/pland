import { IsArray } from "class-validator";

export class FindByTagsDto {
    @IsArray()
    tags: string[];
}