import { IsEmail, MinLength } from 'class-validator';

export class OtpDto {
  @IsEmail()
  email: string;

  @MinLength(10)
  password: string;
}
