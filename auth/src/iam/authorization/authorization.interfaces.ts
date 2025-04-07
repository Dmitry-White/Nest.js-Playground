import { UserData } from '../iam.types';

import { Policy } from './authorization.types';

interface PolicyHandler<T extends Policy> {
  handle(policy: T, user: UserData): Promise<void> | void;
}

export { PolicyHandler };
