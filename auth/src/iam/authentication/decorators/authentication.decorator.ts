import { SetMetadata } from '@nestjs/common';

import { AuthenticationType } from '../enums/authentication.enums';
import { AUTHENTICATION_TYPE_KEY } from '../authentication.constants';

const Authentication = (...authTypes: AuthenticationType[]) =>
  SetMetadata(AUTHENTICATION_TYPE_KEY, authTypes);

export { AUTHENTICATION_TYPE_KEY, Authentication };
