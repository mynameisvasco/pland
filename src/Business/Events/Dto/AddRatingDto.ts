import { IsNumber } from "class-validator";

export class AddRatingDto {
    @IsNumber()
    eventId: number;

    @IsNumber()
    rating?: number;
}