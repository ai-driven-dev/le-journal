import { join } from 'path';

import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { EmailExtractService } from '../email-extract.service';

describe('EmailExtractService', () => {
  let service: EmailExtractService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailExtractService],
    }).compile();

    service = module.get<EmailExtractService>(EmailExtractService);
  });

  it('should extract HTML from email', async () => {
    const filePath = join(__dirname, 'tldr-ai.fixtures.eml');
    const html = await service.extractHtmlFromFile(filePath);

    expect(html).toBeDefined();
    expect(html).not.toBe(false);
  });
});
