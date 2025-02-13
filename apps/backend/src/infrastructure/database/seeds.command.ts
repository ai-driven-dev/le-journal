import { Command, CommandRunner } from 'nest-commander';

import { SeedsService } from './seeds.service';

@Command({ name: 'seed', description: 'Seed the database with initial data' })
export class SeedCommand extends CommandRunner {
  constructor(private readonly seedsService: SeedsService) {
    super();
  }

  async run(): Promise<void> {
    try {
      await this.seedsService.seedAll();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}
