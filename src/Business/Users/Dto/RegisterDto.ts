import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from "class-validator";

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNumber()
  @Min(13)
  @Max(100)
  age: number;

  @IsOptional()
  phone?: string;
}
