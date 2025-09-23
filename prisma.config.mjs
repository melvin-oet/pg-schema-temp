import path from 'node:path';
import { defineConfig } from 'prisma/config';
import 'dotenv/config';

export default defineConfig({
  schema: path.join('prisma'),
  env: {
    load: true,
  },
  generators: {
    client: {
      output: process.env.OET_PRISMA_OUT,
    },
  },
});
