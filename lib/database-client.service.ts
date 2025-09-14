import { Inject } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { CONNECTION } from './database-core.module';

export const DATABASE_CLIENT = 'DATABASE_CLIENT';

export class DatabaseClient {
  constructor(@Inject(CONNECTION) private readonly client: PrismaClient) {}

  get samples() {
    return this.client.sample;
  }

  get bookings() {
    return this.client.booking;
  }
}
