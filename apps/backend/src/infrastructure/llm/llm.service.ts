import { Injectable } from '@nestjs/common';

import { LlmRequest, LlmResponse } from './llm.types';

@Injectable()
export class LlmService {
  async processRequest(request: LlmRequest): Promise<LlmResponse> {
    // TODO: Implement actual LLM processing logic
    // This is a mock implementation
    return {
      content: 'Mock LLM response',
      usage: {
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
      },
    };
  }
}
