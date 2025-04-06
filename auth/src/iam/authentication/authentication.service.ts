import {
  Injectable,
  Inject,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { HASHING_SERVICE } from '../hashing/hashing.constants';
import { HashingProvider } from '../hashing/hashing.interface';
import { UserData } from '../iam.interfaces';
import { jwtConfig } from '../config/jwt.config';

import { PG_UNIQUE_VIOLATION_ERROR_CODE } from './authentication.constants';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,

    @Inject(HASHING_SERVICE)
    private readonly hashingService: HashingProvider,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const user = new User();
      user.email = signUpDto.email;
      user.password = await this.hashingService.hash(signUpDto.password);

      await this.usersRepository.save(user);
    } catch (err) {
      if (err.code === PG_UNIQUE_VIOLATION_ERROR_CODE) {
        throw new ConflictException();
      }
      throw err;
    }
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersRepository.findOneBy({
      email: signInDto.email,
    });
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }
    const isEqual = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );
    if (!isEqual) {
      throw new UnauthorizedException('Password does not match');
    }

    return await this.generateTokens(user);
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const options = {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      };
      const { sub } = await this.jwtService.verifyAsync<Pick<UserData, 'sub'>>(
        refreshTokenDto.refreshToken,
        options,
      );

      const user = await this.usersRepository.findOneByOrFail({
        id: sub,
      });

      return this.generateTokens(user);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  private async generateTokens(user: User) {
    const { accessTokenTtl, refreshTokenTtl } = this.jwtConfiguration;
    const data = { email: user.email };

    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<UserData>>(user.id, accessTokenTtl, data),
      this.signToken(user.id, refreshTokenTtl),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async signToken<T>(userId: number, expiresIn: number, data?: T) {
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
