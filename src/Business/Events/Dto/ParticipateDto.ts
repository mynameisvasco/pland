import { IsNumber } from "class-validator";

export class ParticipateDto {
    @IsNumber()
    eventId: number;
}