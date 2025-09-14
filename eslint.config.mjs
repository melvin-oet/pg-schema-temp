import eslint from '@eslint/js';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  prettierConfig,
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'docs/**',
      'generated/**',
      'coverage/**',
    ],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        project: ['tsconfig.spec.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Type Safety
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      '@typescript-eslint/no-extraneous-class': 'warn',

      // Variable Management
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-shadow': 'warn',

      // Type Annotations
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/explicit-member-accessibility': 'warn',

      // Modern TypeScript Features
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',

      // Promise Handling
      '@typescript-eslint/no-misused-promises': [
        'warn',
        {
          checksVoidReturn: false,
          checksConditionals: false,
        },
      ],
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/prefer-promise-reject-errors': 'warn',

      // Method Calls
      '@typescript-eslint/unbound-method': 'warn',
      '@typescript-eslint/no-base-to-string': 'warn',

      // Error Handling
      '@typescript-eslint/only-throw-error': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',

      // Imports
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports' },
      ],

      // Type Definitions
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/no-empty-function': 'warn',

      // Arrays and Objects
      '@typescript-eslint/prefer-readonly': 'warn',
      '@typescript-eslint/prefer-readonly-parameter-types': 'warn',
      '@typescript-eslint/array-type': ['warn', { default: 'array' }],

      'no-empty': 'warn',
    },
  },
  {
    files: ['**/*.mjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      // Essential code quality
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'no-empty': 'warn',

      // Modern JavaScript practices
      'prefer-const': 'warn',
      'no-var': 'warn',
      'object-shorthand': 'warn',
      'prefer-template': 'warn',
      'template-curly-spacing': 'warn',

      // Best practices
      'no-eval': 'warn',
      'no-implied-eval': 'warn',
      'no-new-func': 'warn',
      'no-script-url': 'warn',

      // Error prevention
      'no-unreachable': 'warn',
      'no-unreachable-loop': 'warn',
      'no-unsafe-negation': 'warn',
      'no-unsafe-optional-chaining': 'warn',

      // Code style
      'no-trailing-spaces': 'warn',
      'eol-last': 'warn',
      'comma-dangle': ['warn', 'always-multiline'],
      semi: ['warn', 'always'],

      // Logic errors
      'no-constant-condition': 'warn',
      'no-dupe-keys': 'warn',
      'no-dupe-args': 'warn',
      'no-dupe-class-members': 'warn',

      // Maintainability
      'max-lines': ['warn', { max: 300 }],
      'max-lines-per-function': ['warn', { max: 50 }],
      complexity: ['warn', { max: 10 }],
    },
  }
);
