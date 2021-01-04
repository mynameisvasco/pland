import { IsNotEmpty, MinLength } from "class-validator";

export class FindAddressLocationQuery {
  @IsNotEmpty()
  @MinLength(5)
  address: string;
}
