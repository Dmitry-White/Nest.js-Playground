import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Type,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { USER_KEY } from '../../authentication/authentication.constants';
import { UserData } from '../../iam.types';
import { AuthorizationHandlerStorage } from '../authorization.storage';
import { Policy } from '../authorization.types';
import { POLICIES_KEY } from '../authorization.constants';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authorizationHandlerStorage: AuthorizationHandlerStorage,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policies = this.reflector.getAllAndOverride<Policy[]>(POLICIES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!policies) {
      return true;
    }

    const user: UserData = context.switchToHttp().getRequest()[USER_KEY];

    try {
      await Promise.all(
        policies.map((policy) => {
          const authorizationHandler = this.authorizationHandlerStorage.get(
            policy.constructor as Type,
          );
          if (!authorizationHandler) {
            return Promise.resolve(null);
          }
          return authorizationHandler.handle(policy, user);
        }),
      );
      return true;
    } catch (error) {
      throw new ForbiddenException((error as Error).message);
    }
  }
}
