import { SetMetadata } from '@nestjs/common';

import { INTERVAL_KEY } from '../scheduler.constants';

const Interval = (ms: number) => SetMetadata(INTERVAL_KEY, ms);

export { Interval };
