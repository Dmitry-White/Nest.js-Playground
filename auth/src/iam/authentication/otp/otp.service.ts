import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';
import { authenticator } from 'otplib';

import { User } from '../../../users/entities/user.entity';

@Injectable()
export class OtpService {
  private issuer: string;

  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.issuer = this.configService.getOrThrow('ISSUER_2FA');
  }

  async generateSecret(accountName: string) {
    const secret = authenticator.generateSecret();

    const uri = authenticator.keyuri(accountName, this.issuer, secret);

    return {
      uri,
      secret,
    };
  }

  verifyCode(token: string, secret: string) {
    return authenticator.verify({
      token,
      secret,
    });
  }

  async enableTfaForUser({ id }: User, secret: string): Promise<void> {
    const updatePayload: DeepPartial<User> = {
      // TIP: Ideally, we would want to encrypt the "secret" instead of
      // storing it in a plaintext. Note - we couldn't use hashing here as
      // the original secret is required to verify the user's provided code.
      secret2FA: secret,
      is2FAEnabled: true,
    };

    await this.userRepository.update({ id }, updatePayload);
  }
}
