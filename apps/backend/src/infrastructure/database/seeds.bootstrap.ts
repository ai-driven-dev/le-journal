import { CommandFactory } from 'nest-commander';

import { AppModule } from '../../app.module';

async function bootstrap(): Promise<void> {
  try {
    await CommandFactory.run(AppModule, {
      logger: ['error', 'warn'],
    });
  } catch (error) {
    console.error('Failed to run seeds:', error);
    process.exit(1);
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
