import { join } from 'path';

import { ConfigModule } from '@nestjs/config'; // ✅ Import this
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { EmailExtractService } from '../email/email-extract.service';

import { SYSTEM_PROMPT } from './llm.data';
import { LlmService } from './llm.service';
import type { LlmRequest } from './llm.types';

describe('LlmService', () => {
  let service: LlmService;
  let emailExtractService: EmailExtractService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [LlmService, EmailExtractService],
    }).compile();

    service = module.get<LlmService>(LlmService);
    emailExtractService = module.get<EmailExtractService>(EmailExtractService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.skip('should process LLM request', async () => {
    const fixturePath = join(__dirname, '../email/tests/tldr-ai-small.fixtures.eml');
    const emailContent = await emailExtractService.extractHtmlFromFile(fixturePath);

    expect(emailContent).not.toBe(false);

    expect(typeof emailContent === 'string' && emailContent.length > 10).toBe(true);

    const request: LlmRequest = {
      systemPrompt: SYSTEM_PROMPT,
      prompt: emailContent as string,
    };

    const response = await service.processRequest(request);

    expect(response).toHaveProperty('content');
    expect(response).toHaveProperty('usage');
  });
});
