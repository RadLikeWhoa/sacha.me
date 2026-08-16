import js from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{ts,tsx,astro}'],
    plugins: {
      js,
    },
    extends: [js.configs.recommended, tseslint.configs.recommended],
  },
  {
    files: ['**/*.astro'],
    extends: [eslintPluginAstro.configs.recommended],
    rules: {
      'astro/prefer-class-list-directive': 'error',
      'astro/prefer-object-class-list': 'error',
      'astro/sort-attributes': 'error',
    },
  },
  {
    files: ['*.astro', '**/*.astro'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
        extraFileExtensions: ['.astro'],
      },
    },
  },
]);
