import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { USER_KEY } from '../../../iam/authentication/authentication.constants';
import { UserData } from '../../../iam/iam.types';
import { PERMISSIONS_KEY } from '../authorization.constants';
import { PermissionType } from '../authorization.types';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextPermissions = this.reflector.getAllAndOverride<
      PermissionType[]
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
    if (!contextPermissions) {
      return true;
    }

    const user: UserData = context.switchToHttp().getRequest()[USER_KEY];

    return contextPermissions.every((permission) =>
      user.permissions?.includes(permission),
    );
  }
}
