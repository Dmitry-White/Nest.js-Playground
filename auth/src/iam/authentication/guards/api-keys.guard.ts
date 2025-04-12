import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { UserData } from '../../../iam/iam.types';
import { extractFromAuthHeader } from '../../../utils/request';

import { ApiKeysService } from '../api-keys/api-keys.service';
import { USER_KEY } from '../authentication.constants';
import { AuthenticationType } from '../enums/authentication.enums';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const apiKey = extractFromAuthHeader(request, AuthenticationType.ApiKey);
    if (!apiKey) {
      throw new UnauthorizedException();
    }

    try {
      const apiKeyEntity = await this.apiKeysService.read(apiKey);
      if (!apiKeyEntity) {
        throw new UnauthorizedException();
      }

      await this.apiKeysService.validate(apiKey, apiKeyEntity.key);

      const payload: UserData = {
        sub: apiKeyEntity.user.id,
        email: apiKeyEntity.user.email,
        role: apiKeyEntity.user.role,
        permissions: apiKeyEntity.user.permissions,
      };
      request[USER_KEY] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
