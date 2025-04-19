import { DynamicModule } from '@nestjs/common';

type Options = {
  baseUrl?: string;
};

type Extras = { isGlobal?: boolean };

type TransformDefinition = (
  definition: DynamicModule,
  extras: Extras,
) => DynamicModule;

export { Options, Extras, TransformDefinition };
