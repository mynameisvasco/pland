import { IsNotEmpty } from "class-validator";

export class FindByAddressDto {
  @IsNotEmpty()
  address: string;
}
