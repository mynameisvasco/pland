import { IsNotEmpty, IsNumber } from "class-validator";
import { WeekDays } from "../../../Domain/Enums/WeekDays";
import { Coordinates } from "../../../Domain/Models/Coordinates";

export class CreateDto {
  @IsNotEmpty()
  name: string;

  location: Coordinates

  @IsNumber()
  price: number;

  opensAt: String;

  closesAt: String;

  @IsNotEmpty()
  availableDays: WeekDays[];
}
