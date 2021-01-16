import { IsNotEmpty, IsNumber, Min } from "class-validator";
export class FindByLocationDto {
  @IsNotEmpty()
  coordinates: any;

  @IsNumber()
  @Min(10)
  radius: number;
}
