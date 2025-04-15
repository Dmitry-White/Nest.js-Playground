import { SetMetadata } from '@nestjs/common';

import { HOST_KEY } from '../scheduler.constants';

const Host = (enabled: boolean = true) => SetMetadata(HOST_KEY, enabled);

export { Host };
