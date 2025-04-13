import {
  Injectable,
  Inject,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { HASHING_SERVICE } from '../hashing/hashing.constants';
import { HashingProvider } from '../hashing/hashing.interface';
import { UserData } from '../iam.types';

import { jwtConfig } from './config/jwt.config';
import { OtpDto } from './dto/otp.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ApiKeysService } from './api-keys/api-keys.service';
import { ApiKeyPayload } from './api-keys/api-keys.types';
import { OtpService } from './otp/otp.service';
import { PG_UNIQUE_VIOLATION_ERROR_CODE } from './authentication.constants';
import { AuthenticationStorage } from './authentication.storage';
import { TokenData } from './authentication.types';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,

    @Inject(HASHING_SERVICE)
    private readonly hashingService: HashingProvider,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly jwtService: JwtService,
    private readonly authenticationStorage: AuthenticationStorage,

    private readonly apiKeyService: ApiKeysService,

    private readonly otpService: OtpService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    try {
      const user = new User();
      user.email = signUpDto.email;
      user.password = await this.hashingService.hash(signUpDto.password);

      await this.usersRepository.save(user);
    } catch (err) {
      if (
        (err as Record<string, string>).code === PG_UNIQUE_VIOLATION_ERROR_CODE
      ) {
        throw new ConflictException();
      }
      throw err;
    }
  }

  async signIn(signInDto: SignInDto): Promise<TokenData> {
    const user = await this.getUser(signInDto);

    if (!user.is2FAEnabled) {
      return await this.generateTokens(user);
    }

    const isValid = this.otpService.verifyCode(signInDto.code, user.secret2FA);
    if (!isValid) {
      throw new UnauthorizedException('Invalid 2FA code');
    }

    return await this.generateTokens(user);
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<TokenData> {
    try {
      const options = {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      };
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<UserData, 'sub'> & { refreshTokenId: string }
      >(refreshTokenDto.refreshToken, options);

      const user = await this.usersRepository.findOneByOrFail({
        id: sub,
      });

      const isValid = await this.authenticationStorage.validate(
        user.id,
        refreshTokenId,
      );
      if (!isValid) {
        throw new Error('Refresh token is invalid');
      }

      await this.authenticationStorage.invalidate(user.id);

      return this.generateTokens(user);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  async apiKey(signInDto: SignInDto): Promise<ApiKeyPayload> {
    const user = await this.usersRepository.findOneBy({
      email: signInDto.email,
    });
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }

    const apiKey = await this.apiKeyService.create(user.id);

    return apiKey;
  }

  async generate2FA(otpDto: OtpDto): Promise<string> {
    const user = await this.getUser(otpDto);

    const { secret, uri } = await this.otpService.generateSecret(user.email);

    await this.otpService.enableTfaForUser(user, secret);

    return uri;
  }

  async getUser({ email, password }: OtpDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      email: email,
    });
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }

    const isEqual = await this.hashingService.compare(password, user.password);
    if (!isEqual) {
      throw new UnauthorizedException('Password does not match');
    }

    return user;
  }

  private async generateTokens({
    id,
    email,
    role,
    permissions,
  }: User): Promise<TokenData> {
    const refreshTokenId = randomUUID();
    const { accessTokenTtl, refreshTokenTtl } = this.jwtConfiguration;
    const accessTokenData = { email, role, permissions };
    const refreshTokenData = {
      refreshTokenId,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<UserData>>(id, accessTokenTtl, accessTokenData),
      this.signToken(id, refreshTokenTtl, refreshTokenData),
    ]);

    await this.authenticationStorage.insert(id, refreshTokenId);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async signToken<T>(
    userId: number,
    expiresIn: number,
    data?: T,
  ): Promise<string> {
    const payload = {
      sub: userId,
      ...data,
    };

    const options = {
      audience: this.jwtConfiguration.audience,
      issuer: this.jwtConfiguration.issuer,
      secret: this.jwtConfiguration.secret,
      expiresIn,
    };

    return await this.jwtService.signAsync(payload, options);
  }
}
