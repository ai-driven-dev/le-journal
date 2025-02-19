import { PROMPT_UPDATE_FREQUENCY, UserRole } from '@le-journal/shared-types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PromptUpdateService {
  canUpdatePrompt(userRole: UserRole, lastPromptUpdate: Date | undefined): boolean {
    if (lastPromptUpdate === undefined) {
      return true;
    }

    if (userRole === 'ADMIN') {
      return true;
    }

    const now = new Date();
    const hoursSinceLastUpdate = (now.getTime() - lastPromptUpdate.getTime()) / (1000 * 60 * 60);

    return hoursSinceLastUpdate >= PROMPT_UPDATE_FREQUENCY;
  }
}
