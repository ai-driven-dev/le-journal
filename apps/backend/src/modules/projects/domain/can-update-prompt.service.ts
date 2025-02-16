import { PROMPT_UPDATE_DELAY_HOURS } from '@le-journal/shared-types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PromptUpdateService {
  canUpdatePrompt(lastPromptUpdate: Date | null): boolean {
    if (lastPromptUpdate === null) {
      return true;
    }

    const now = new Date();
    const hoursSinceLastUpdate = (now.getTime() - lastPromptUpdate.getTime()) / (1000 * 60 * 60);

    return hoursSinceLastUpdate >= PROMPT_UPDATE_DELAY_HOURS;
  }
}
