import { IsNotEmpty } from "class-validator";

export class FindByAddressQuery {
  @IsNotEmpty()
  address: string;
}
