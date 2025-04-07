import { SetMetadata } from '@nestjs/common';

import { POLICIES_KEY } from '../authorization.constants';
import { Policy } from '../authorization.types';

const Policies = (...policies: Policy[]) => SetMetadata(POLICIES_KEY, policies);

export { Policies };
