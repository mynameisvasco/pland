import {
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsString,
  IsArray,
  Min,
  IsDate,
} from "class-validator";

export class CreateDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  attendanceLimit: number;

  @IsNumber()
  placeId: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  startsAt: Date;

  @IsNumber()
  @Min(1)
  duration: number;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsNumber()
  needsTicket: number;
}
