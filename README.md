# oet-pg-schema

This package provides a reusable database module that can be imported into services to establish database connections and access database models. It includes:

- **DatabaseCoreModule**: A dynamic NestJS module for database connection management with lifecycle management.
- **DatabaseClient**: A service that wraps Prisma Client and exposes database models.
- **Prisma Schema**: Pre-defined database models (booking, sample).

## How to use this package

### 1. Install the package

```bash
pnpm add @oet-engineering/oet-pg-schema
```

### 2. Import the Module

```typescript
import { Module } from '@nestjs/common';
import { AppService } from './app.service'
import { DatabaseCoreModule } from '@oet-engineering/oet-pg-schema';

@Module({
  imports: [
    DatabaseCoreModule.forRoot({
      url: process.env.DATABASE_URL,
    }),
  ],
  providers: [AppService]
})
export class AppModule {}
```

### 3. Enable Shutdown Hooks in main.ts

**Important**: You must enable shutdown hooks in your main.ts file after `NestFactory.create()` to ensure proper database cleanup:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();
  
  await app.listen(3000);
}
bootstrap();
```

### 4. Inject the Database Client

```typescript
import { Injectable, Inject } from '@nestjs/common';
import { DATABASE_CLIENT, DatabaseClient } from '@oet-engineering/oet-pg-schema';

@Injectable()
export class AppService {
  constructor(
    @Inject(DATABASE_CLIENT) private readonly client: DatabaseClient,
  ) {}

  async getSamples() {
    return this.client.samples.findMany();
  }

  async createSample(name?: string) {
    return this.client.samples.create({
      data: { name },
    });
  }

}
```

## How to add/update schema models

**⚠️ Important**: All new models must be created within this package only. Do not attempt to create models outside of this package as it will break the centralized schema management.

### Step 1: Create a new prisma schema file

Create a new `.prisma` file in the `prisma/models/` directory. For example, to add a `user` model:

```bash
# Create the model file
touch prisma/models/user.prisma
```

### Step 2: Define the Model

Add your model definition to the new file. Follow the existing pattern:

```prisma
// prisma/models/user.prisma
model user {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@schema("public")
}
```

### Step 3: Update Prisma client

After adding the model, regenerate the Prisma client to include your new model:

```bash
pnpm prisma:generate
```

### Step 4: Update the Database Client

Add a getter method for your new model in `lib/database-client.service.ts`:

```typescript
// lib/database-client.service.ts
export class DatabaseClient {
  constructor(@Inject(CONNECTION) private readonly client: PrismaClient) {}

  get samples() {
    return this.client.sample;
  }

  get bookings() {
    return this.client.booking;
  }

  // Add your new model getter
  get users() {
    return this.client.user;
  }
}
```

### Step 5: Create and Run Migration

Create a migration for your new model:

```bash
pnpm prisma:migrate
```

This will:
- Create a new migration file in `prisma/migrations/`
- Apply the migration to your database
- Update the database schema
