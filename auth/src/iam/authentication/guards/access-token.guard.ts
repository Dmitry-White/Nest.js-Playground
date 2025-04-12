import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { UserData } from '../../../iam/iam.types';
import { extractFromAuthHeader } from '../../../utils/request';

import { jwtConfig } from '../config/jwt.config';
import { USER_KEY } from '../authentication.constants';
import { AuthenticationType } from '../enums/authentication.enums';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = extractFromAuthHeader(request, AuthenticationType.Bearer);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync<Partial<UserData>>(
        token,
        this.jwtConfiguration,
      );
      request[USER_KEY] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
