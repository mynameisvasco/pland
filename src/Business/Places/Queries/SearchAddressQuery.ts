import { IsNotEmpty, MinLength } from "class-validator";

export class SearchAddressQuery {
  @IsNotEmpty()
  @MinLength(5)
  address: string;
}
