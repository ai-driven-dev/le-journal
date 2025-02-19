import { ProjectPromptInstructions } from '@le-journal/shared-types';

import { Property } from 'src/infrastructure/http/api-domain-property.decorator';

export class ProjectUpdate extends ProjectPromptInstructions {
  @Property('id')
  id!: string;

  @Property('promptInstruction', 'The instruction prompt for the project')
  promptInstruction!: string;

  @Property('canUpdatePrompt', 'Whether the prompt can be updated')
  canUpdatePrompt: boolean = false;

  @Property('lastPromptUpdate', 'The last prompt update date')
  lastPromptUpdate?: string;
}
