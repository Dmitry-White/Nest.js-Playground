import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { User } from '../users/entities/user.entity';
import { jwtConfig } from '../common/config/jwt.config';
import { AccessTokenGuard } from '../lib/guards/access-token.guard';

import { HASHING_SERVICE } from './hashing/hashing.constants';
import { HashingService } from './hashing/hashing.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthenticationController],
  providers: [
    {
      provide: HASHING_SERVICE,
      useClass: HashingService,
    },
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    AuthenticationService,
  ],
  exports: [
    {
      provide: HASHING_SERVICE,
      useClass: HashingService,
    },
  ],
})
export class IamModule {}
