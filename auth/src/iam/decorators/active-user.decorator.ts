import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { REQUEST_USER_KEY } from '../authentication/authentication.constants';
import { UserData } from '../iam.types';

export const ActiveUser = createParamDecorator(
  (field: keyof UserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: UserData | undefined = request[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  },
);
