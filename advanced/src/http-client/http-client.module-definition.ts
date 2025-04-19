import {
  ConfigurableModuleBuilder,
  ConfigurableModuleBuilderOptions,
} from '@nestjs/common';

import { Extras, Options, TransformDefinition } from './http-client.types';

const builderOptions: ConfigurableModuleBuilderOptions = {
  alwaysTransient: true,
  moduleName: 'HttpClient',
};

const extras: Extras = {
  isGlobal: true,
};

const transformDefinition: TransformDefinition = (definition, extras) => ({
  ...definition,
  global: extras.isGlobal,
});

const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: HTTP_MODULE_OPTIONS,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<Options>(builderOptions)
  .setClassMethodName('forRoot')
  .setFactoryMethodName('resolve')
  .setExtras<Extras>(extras, transformDefinition)
  .build();

export {
  ConfigurableModuleClass,
  HTTP_MODULE_OPTIONS,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
};
