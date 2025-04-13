import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import Redis, { RedisOptions } from 'ioredis';
import * as session from 'express-session';
import * as passport from 'passport';
import RedisStore from 'connect-redis';

import { User } from '../users/entities/user.entity';

import { jwtConfig } from './authentication/config/jwt.config';
import { cacheConfig } from './authentication/config/cache.config';
import { HASHING_SERVICE } from './hashing/hashing.constants';
import { HashingService } from './hashing/hashing.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { AccessTokenGuard } from './authentication/guards/access-token.guard';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { AuthenticationStorage } from './authentication/authentication.storage';
import { RolesGuard } from './authorization/guards/roles.guard';
import { PermissionsGuard } from './authorization/guards/permissions.guard';
import { PoliciesGuard } from './authorization/guards/policy.guard';
import { AuthorizationHandlerStorage } from './authorization/authorization.storage';
import { FrameworkContributorPolicyHandler } from './authorization/policies/framework-contributor.policy';
import { ApiKey } from './authentication/entities/api-key.entity';
import { ApiKeyGuard } from './authentication/guards/api-keys.guard';
import { ApiKeysService } from './authentication/api-keys/api-keys.service';
import { OtpService } from './authentication/otp/otp.service';
import { CACHE_CONFIG } from './authentication/authentication.constants';
import { UserSerializer } from './authentication/serializers/user.serializer';
import { SessionGuard } from './authentication/guards/session.guard';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(cacheConfig),
    TypeOrmModule.forFeature([User, ApiKey]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthenticationController],
  providers: [
    {
      provide: HASHING_SERVICE,
      useClass: HashingService,
    },
    AccessTokenGuard,
    ApiKeyGuard,
    SessionGuard,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard,
    },
    AuthenticationService,
    AuthenticationStorage,
    AuthorizationHandlerStorage,
    FrameworkContributorPolicyHandler,
    ApiKeysService,
    OtpService,
    UserSerializer,
  ],
  exports: [
    {
      provide: HASHING_SERVICE,
      useClass: HashingService,
    },
  ],
})
export class IamModule implements NestModule {
  private cacheConfig: RedisOptions;
  private sessionSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.cacheConfig = this.configService.getOrThrow(CACHE_CONFIG);
    this.sessionSecret = this.configService.getOrThrow('SESSION_SECRET');
  }
  configure(consumer: MiddlewareConsumer) {
    const client = new Redis(this.cacheConfig);
    // @ts-ignore
    const store = new RedisStore({ client });

    const options = {
      store,
      secret: this.sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: true,
        httpOnly: true,
      },
    };

    consumer
      .apply(session(options), passport.initialize(), passport.session())
      .forRoutes('*');
  }
}
