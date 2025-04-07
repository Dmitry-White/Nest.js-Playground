import { registerAs } from '@nestjs/config';

import { CACHE_CONFIG } from '../authentication.constants';

const cacheConfig = registerAs(CACHE_CONFIG, () => ({
  host: process.env.CACHE_HOST,
  port: process.env.CACHE_PORT,
}));

export { cacheConfig };
