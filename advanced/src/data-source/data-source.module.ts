import { Module } from '@nestjs/common';

import { DataSourceService } from './data-source.service';

@Module({
  providers: [
    DataSourceService,
    // Alternatively,
    // Providers can be marked "durable" during registration
    // {
    //   provide: 'DATA_SOURCE',
    //   useFactory: (payload) => new DataSource(...),
    //   scope: Scope.REQUEST,
    //   durable: true,
    // },
  ],
  exports: [DataSourceService],
})
export class DataSourceModule {}
