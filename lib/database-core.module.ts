import { DynamicModule, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ModuleRef } from '@nestjs/core';
import { DATABASE_CLIENT, DatabaseClient } from './database-client.service';

export const CONNECTION = 'CONNECTION';

export interface DatabaseCoreModuleOptions {
  readonly url: string;
}

@Module({})
export class DatabaseCoreModule {
  public constructor(private readonly moduleRef: ModuleRef) {}
  public static forRoot(
    options: Readonly<DatabaseCoreModuleOptions>
  ): DynamicModule {
    const connectionProvider = {
      provide: CONNECTION,
      useFactory: async (): Promise<PrismaClient> => {
        const client = new PrismaClient({
          datasources: {
            db: {
              url: options.url ?? process.env.OET_DATABASE_URL ?? '',
            },
          },
        });

        await client.$connect();

        return client;
      },
    };

    const databaseClientProvider = {
      provide: DATABASE_CLIENT,
      useFactory: (prismaClient: Readonly<PrismaClient>): DatabaseClient => {
        return new DatabaseClient(prismaClient as PrismaClient);
      },
      inject: [CONNECTION],
    };

    return {
      module: DatabaseCoreModule,
      providers: [connectionProvider, databaseClientProvider],
      exports: [databaseClientProvider],
    };
  }

  public async onApplicationShutdown(): Promise<void> {
    const connection = this.moduleRef.get<PrismaClient>(CONNECTION, {
      strict: false,
    });
    if (connection) {
      await connection.$disconnect();
    }
  }
}
