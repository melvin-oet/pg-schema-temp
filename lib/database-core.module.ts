import { DynamicModule, Module } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { ModuleRef } from '@nestjs/core';
import { DATABASE_CLIENT, DatabaseClient } from './database-client.service';

export const CONNECTION = 'CONNECTION';

export interface DatabaseCoreModuleOptions {
  url: string;
}

@Module({})
export class DatabaseCoreModule {
  constructor(private readonly moduleRef: ModuleRef) {}
  static forRoot(options: DatabaseCoreModuleOptions): DynamicModule {
    const connectionProvider = {
      provide: CONNECTION,
      useFactory: async () => {
        const client = new PrismaClient({
          datasources: {
            db: {
              url: options.url,
            },
          },
        });

        await client.$connect();

        return client;
      },
    };

    const databaseClientProvider = {
      provide: DATABASE_CLIENT,
      useFactory: async (prismaClient: PrismaClient) => {
        const client = new DatabaseClient(prismaClient);
        return client;
      },
      inject: [CONNECTION],
    };

    return {
      module: DatabaseCoreModule,
      providers: [connectionProvider, databaseClientProvider],
      exports: [databaseClientProvider],
    };
  }

  async onApplicationShutdown() {
    const connection = this.moduleRef.get<PrismaClient>(CONNECTION, {
      strict: false,
    });
    if (connection) {
      await connection.$disconnect();
    }
  }
}
