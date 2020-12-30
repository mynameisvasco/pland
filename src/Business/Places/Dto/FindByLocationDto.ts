import { IsLatitude, IsLongitude, IsNumber, Max, Min } from "class-validator";

export class FindByLocationDto {
  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;

  @IsNumber()
  @Min(10)
  radius: number;
}
