import { IsNumberString } from 'class-validator';
import { OtpDto } from './otp.dto';

export class SignInDto extends OtpDto {
  @IsNumberString()
  code: string;
}
