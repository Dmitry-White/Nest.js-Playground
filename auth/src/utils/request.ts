import { Request } from 'express';

import { AuthenticationType } from '../iam/authentication/enums/authentication.enums';

const extractFromAuthHeader = (
  request: Request,
  target: AuthenticationType,
): string | null => {
  const authorizationHeader = request.headers.authorization;
  if (!authorizationHeader) return null;

  const [type, key] = authorizationHeader.split(' ') as [
    AuthenticationType,
    string,
  ];

  return type === target ? key : null;
};

export { extractFromAuthHeader };
