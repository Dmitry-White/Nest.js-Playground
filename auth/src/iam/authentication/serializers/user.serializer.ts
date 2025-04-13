import { PassportSerializer } from '@nestjs/passport';

import { User } from '../../../users/entities/user.entity';
import { UserData } from '../../iam.types';

export class UserSerializer extends PassportSerializer {
  serializeUser(user: User, done: (err: Error | null, user: UserData) => void) {
    done(null, {
      sub: user.id,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    });
  }

  deserializeUser(
    payload: UserData,
    done: (err: Error | null, user: UserData) => void,
  ) {
    done(null, payload);
  }
}
