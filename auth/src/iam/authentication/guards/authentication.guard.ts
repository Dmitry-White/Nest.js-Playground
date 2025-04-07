import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthenticationType } from '../enums/authentication.enums';
import { AUTHENTICATION_TYPE_KEY } from '../authentication.constants';

import { AccessTokenGuard } from './access-token.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthenticationType.Bearer;
  private readonly authTypeGuardMap: Record<
    AuthenticationType,
    CanActivate | CanActivate[]
  >;

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {
    this.authTypeGuardMap = {
      [AuthenticationType.Bearer]: this.accessTokenGuard,
      [AuthenticationType.None]: { canActivate: () => true },
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const explicitAuthenticationTypes = this.reflector.getAllAndOverride<
      AuthenticationType[]
    >(AUTHENTICATION_TYPE_KEY, [context.getHandler(), context.getClass()]);

    const authenticationTypes = explicitAuthenticationTypes ?? [
      AuthenticationGuard.defaultAuthType,
    ];

    const guards = authenticationTypes
      .map((type) => this.authTypeGuardMap[type])
      .flat();

    for (const instance of guards) {
      const canActivate = await Promise.resolve(instance.canActivate(context));

      if (canActivate) {
        return true;
      }
    }
    throw new UnauthorizedException();
  }
}
