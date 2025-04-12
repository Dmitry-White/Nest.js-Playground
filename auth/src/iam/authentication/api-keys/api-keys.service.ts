import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import { HashingProvider } from '../../../iam/hashing/hashing.interface';
import { HASHING_SERVICE } from '../../../iam/hashing/hashing.constants';
import { AuthenticationEncoding } from '../enums/authentication.enums';
import { ApiKey } from '../entities/api-key.entity';

import { ApiKeyPayload } from './api-keys.types';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ApiKeysService {
  constructor(
    @Inject(HASHING_SERVICE)
    private readonly hashingService: HashingProvider,

    @InjectRepository(ApiKey)
    private readonly apiKeysRepository: Repository<ApiKey>,
  ) {}

  async create(id: number): Promise<ApiKeyPayload> {
    const uuid = this.generateApiKey(id);
    const hashedKey = await this.hashingService.hash(uuid);

    const apiKey = new ApiKey();
    apiKey.uuid = uuid;
    apiKey.key = hashedKey;

    const user = new User();
    user.id = id;

    apiKey.user = user;

    await this.apiKeysRepository.save(apiKey);

    return {
      apiKey: apiKey.uuid,
    };
  }

  async read(uuid: string): Promise<ApiKey | null> {
    const apiKeyEntity = await this.apiKeysRepository.findOne({
      where: { uuid },
      relations: { user: true },
    });
    return apiKeyEntity;
  }

  async validate(apiKey: string, hashedKey: string): Promise<boolean> {
    return this.hashingService.compare(apiKey, hashedKey);
  }

  private generateApiKey(id: number): string {
    const apiKey = `${id} ${randomUUID()}`;
    return Buffer.from(apiKey).toString(AuthenticationEncoding.Base64);
  }
}
