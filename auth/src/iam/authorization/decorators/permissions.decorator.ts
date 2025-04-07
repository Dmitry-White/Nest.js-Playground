import { SetMetadata } from '@nestjs/common';

import { PermissionType } from '../authorization.types';
import { PERMISSIONS_KEY } from '../authorization.constants';

const Permissions = (...permissions: PermissionType[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);

export { Permissions };
