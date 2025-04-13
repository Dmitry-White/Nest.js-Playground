import { Res, Req } from '@nestjs/common';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { promisify } from 'util';
import { Response, Request } from 'express';
import { toFileStream } from 'qrcode';

import { Authentication } from './decorators/authentication.decorator';
import { OtpDto } from './dto/otp.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthenticationType } from './enums/authentication.enums';
import { ApiKeyPayload } from './api-keys/api-keys.types';
import { AuthenticationService } from './authentication.service';
import { TokenData } from './authentication.types';

@Authentication(AuthenticationType.None)
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.authenticationService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('otp')
  async generateQrCode(
    @Body() otpDto: OtpDto,
    @Res() response: Response,
  ): Promise<void> {
    const uri = await this.authenticationService.generate2FA(otpDto);
    response.type('png');

    return toFileStream(response, uri);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto): Promise<TokenData> {
    return this.authenticationService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in-cookie')
  async signInCookie(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const { accessToken } = await this.authenticationService.signIn(signInDto);

    response.cookie('accessToken', accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokenData> {
    return this.authenticationService.refreshTokens(refreshTokenDto);
  }

  @Post('api-key')
  apiKey(@Body() signInDto: SignInDto): Promise<ApiKeyPayload> {
    return this.authenticationService.apiKey(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('session')
  async session(@Req() request: Request, @Body() otpDto: OtpDto) {
    const user = await this.authenticationService.getUser(otpDto);

    await promisify(request.logIn).call(request, user);
  }
}
