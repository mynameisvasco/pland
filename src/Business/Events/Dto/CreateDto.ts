import {
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsString,
  IsArray,
  Min
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

  @IsString()
  startsAt: string;

  @IsNumber()
  @Min(1)
  duration: number;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsBoolean()
  needsTicket: boolean;
}
