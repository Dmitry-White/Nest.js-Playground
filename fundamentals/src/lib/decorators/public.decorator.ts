import { SetMetadata } from '@nestjs/common';

const PUBLIC_ROUTE = Symbol('isPublic');

const Public = () => SetMetadata(PUBLIC_ROUTE, true);

export { PUBLIC_ROUTE, Public };
