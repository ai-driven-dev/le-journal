import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

import { LlmRequest, LlmResponse } from './llm.types';

const projectSchema = z.object({
  articles: z.array(
    z.object({
      title: z.string(),
      link: z.string(),
      summary: z.string(),
      score: z.number(),
    }),
  ),
});
@Injectable()
export class LlmService {
  private readonly openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });

    if (!this.openai.apiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }
  }

  async processRequest(request: LlmRequest): Promise<LlmResponse> {
    try {
      const response = await this.callOpenAI(request);
      return response;
    } catch (error) {
      console.error("Erreur lors de l'appel à OpenAI:", error);
      throw error;
    }
  }

  private async callOpenAI(request: LlmRequest): Promise<LlmResponse> {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: request.systemPrompt,
        },
        { role: 'user', content: request.prompt },
      ],
      response_format: zodResponseFormat(projectSchema, 'project'),
    });

    return {
      content: completion.choices[0].message?.content || '',
      usage: {
        promptTokens: completion.usage?.prompt_tokens || 0,
        completionTokens: completion.usage?.completion_tokens || 0,
        totalTokens: completion.usage?.total_tokens || 0,
      },
    };
  }
}
