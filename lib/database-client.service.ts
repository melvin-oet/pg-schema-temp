import { Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CONNECTION } from './database-core.module';

export const DATABASE_CLIENT = 'DATABASE_CLIENT';

export class DatabaseClient {
  public constructor(
    @Inject(CONNECTION) private readonly client: PrismaClient
  ) {}

  public get samples() {
    return this.client.sample;
  }

  public get bookings() {
    return this.client.booking;
  }
}
