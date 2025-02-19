import 'dotenv/config';

import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            decorators: true,
            tsx: false,
          },
          target: 'es2021',
          transform: {
            decoratorMetadata: true,
            legacyDecorator: true,
          },
        },
      },
    ],
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  rootDir: 'src',
  verbose: false,
  maxWorkers: 1,
  detectOpenHandles: false, // ✅ Prevents verbose open handle logs
  forceExit: false, // ✅ Stops Jest from logging cleanup steps
  collectCoverage: false,
  coverageDirectory: '../coverage',
  coveragePathIgnorePatterns: ['src/prisma/prisma.types.ts'],
  coverageReporters: ['text', 'html', 'json-summary'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testTimeout: 30000,
};

export default config;
