import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

import { HashingProvider } from './hashing.interface';

@Injectable()
export class HashingService implements HashingProvider {
  async hash(data: string | Buffer): Promise<string> {
    const salt = await genSalt();
    return hash(data, salt);
  }

  compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return compare(data, encrypted);
  }
}
