import { PermissionType } from './authorization/authorization.types';
import { Role } from './authorization/enums/role.enum';

interface UserData {
  /**
   * The "subject" of the token. The value of this property is the user ID
   * that granted this token.
   */
  sub: number;

  /**
   * The subject's (user) email.
   */
  email: string;

  /**
   * The subject's (user) role.
   */
  role: Role;

  /**
   * The subject's (user) permissions.
   */
  permissions: PermissionType[];
}

export type { UserData };
