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
