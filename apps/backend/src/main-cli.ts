import { CommandFactory } from 'nest-commander';

import { SeedsModule } from './infrastructure/database/seeds.module';

async function bootstrapCli(): Promise<void> {
  await CommandFactory.run(SeedsModule);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrapCli();
