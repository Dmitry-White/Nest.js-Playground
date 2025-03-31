import { registerAs } from '@nestjs/config';

import { COFFEES_CONFIG } from '../coffees.constants';

const config = registerAs(COFFEES_CONFIG, () => ({
  foo: 'bar',
}));

export { config };
