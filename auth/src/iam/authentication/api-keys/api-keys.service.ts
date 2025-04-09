import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { GeneratedApiKeyPayload } from './api-keys.types';
import { HashingProvider } from 'src/iam/hashing/hashing.interface';
import { HASHING_SERVICE } from 'src/iam/hashing/hashing.constants';

@Injectable()
export class ApiKeysService {
  constructor(
    @Inject(HASHING_SERVICE)
    private readonly hashingService: HashingProvider,
  ) {}

  async create(id: number): Promise<GeneratedApiKeyPayload> {
    const apiKey = this.generateApiKey(id);
    const hashedKey = await this.hashingService.hash(apiKey);
    return { apiKey, hashedKey };
  }

  async validate(apiKey: string, hashedKey: string): Promise<boolean> {
    return this.hashingService.compare(apiKey, hashedKey);
  }

  extract(apiKey: string): string {
    const [id] = Buffer.from(apiKey, 'base64').toString('ascii').split(' ');
    return id;
  }

  private generateApiKey(id: number): string {
    const apiKey = `${id} ${randomUUID()}`;
    return Buffer.from(apiKey).toString('base64');
  }
}
