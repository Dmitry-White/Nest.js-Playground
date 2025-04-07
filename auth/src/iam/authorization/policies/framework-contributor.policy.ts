import { Injectable } from '@nestjs/common';

import { UserData } from '../../../iam/iam.types';
import { Policy } from '../authorization.types';
import { PolicyHandler } from '../authorization.interfaces';
import { AuthorizationHandlerStorage } from '../authorization.storage';

class FrameworkContributorPolicy implements Policy {
  name = 'FrameworkContributor';
}

@Injectable()
class FrameworkContributorPolicyHandler
  implements PolicyHandler<FrameworkContributorPolicy>
{
  constructor(
    private readonly authorizationHandlerStorage: AuthorizationHandlerStorage,
  ) {
    this.authorizationHandlerStorage.add(FrameworkContributorPolicy, this);
  }

  handle(policy: FrameworkContributorPolicy, user: UserData): void {
    const isContributor = user.email.endsWith('@gmail.com');
    if (!isContributor) {
      throw new Error('User is not a contributor');
    }
  }
}

export { FrameworkContributorPolicy, FrameworkContributorPolicyHandler };
