import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { GoogleService } from '../../../../../infrastructure/google/google.service';
import {
  PROJECT_REPOSITORY,
  ProjectRepository,
} from '../../../domain/project.repository.interface';
import {
  GoogleError,
  LabelAlreadyExistsException,
} from '../../exceptions/label-already-exists.exception';

const LABEL_PREFIX = 'Le Journal';

@Injectable()
export class SetupProjectLabelUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
    private readonly googleService: GoogleService,
  ) {}

  async execute(userId: string, projectId: string): Promise<boolean> {
    const projects = await this.projectRepository.findBy([
      { key: 'id', value: projectId },
      { key: 'user_id', value: userId },
    ]);

    if (projects.length === 0) {
      throw new NotFoundException(`Project not found with id ${projectId} for user id ${userId}`);
    }

    const project = projects[0];
    const labelName = `${LABEL_PREFIX} - ${project.name}`;

    try {
      const label = await this.googleService.createGmailLabel(userId, labelName);
      const labelId = label.id;

      if (labelId === null) {
        throw new InternalServerErrorException('Label ID is null');
      }

      await this.projectRepository.update(project.id, {
        google_label_id: labelId,
        google_label_name: labelName,
      });

      return true;
    } catch (error) {
      if (error !== undefined && error !== null) {
        const googleError = (error as unknown as { response: { data: { error: GoogleError } } })
          .response.data.error as GoogleError;

        if (googleError.code === 409) {
          throw new LabelAlreadyExistsException(googleError);
        }
      }
      throw error;
    }
  }
}
