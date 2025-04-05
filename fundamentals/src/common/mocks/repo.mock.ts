import { ObjectLiteral } from 'typeorm';

import { MockRepository } from '../types/test.types';

const createMockRepository = <
  T extends ObjectLiteral,
>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

export { createMockRepository };
