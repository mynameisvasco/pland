import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  phone?: string;
}
