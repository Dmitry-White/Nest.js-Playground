import { SetMetadata } from '@nestjs/common';

import { PERMISSIONS_KEY } from '../authorization.constants';
import { PermissionType } from '../authorization.types';

const Permissions = (...permissions: PermissionType[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);

export { Permissions };
