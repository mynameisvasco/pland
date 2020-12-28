import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateDto {
  @IsNotEmpty()
  name: string;
}
