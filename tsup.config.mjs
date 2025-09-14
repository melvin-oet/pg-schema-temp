import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['lib/index.ts'],
  format: ['cjs'],
  dts: true,
  sourcemap: false,
  clean: true,
  outDir: 'dist',
  target: 'es2022',
});
