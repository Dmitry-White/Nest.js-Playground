import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { ClassConstructor } from '../common/types/app.types';

const validateConfigWith =
  (cls: ClassConstructor) => (config: Record<string, unknown>) => {
    const validatedConfig: object = plainToInstance(cls, config, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });
    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return validatedConfig;
  };
export { validateConfigWith };
