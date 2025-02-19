import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { GoogleService } from '../../../../infrastructure/google/google.service';
import { PROJECT_REPOSITORY, ProjectRepository } from '../../domain/project.repository.interface';

@Injectable()
export class SetupFilterUseCase {
  constructor(
    private readonly googleService: GoogleService,
    private readonly logger: Logger,
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(userId: string, projectId: string): Promise<boolean> {
    const projects = await this.projectRepository.findBy([
      { key: 'id', value: projectId },
      { key: 'user_id', value: userId },
    ]);

    if (projects.length === 0) {
      throw new NotFoundException(`Projet non trouvé avec l'identifiant ${projectId}`);
    }

    if (projects.length > 1) {
      throw new InternalServerErrorException('Plusieurs projets trouvés pour le même utilisateur');
    }

    const project = await this.projectRepository.findGoogleInfo(projectId);

    if (
      project.google_label_id === undefined ||
      project.google_label_id === null ||
      project.google_label_id.length === 0
    ) {
      throw new InternalServerErrorException(
        `Label Gmail (${project.google_label_id}) non trouvé pour le projet ${projectId}`,
      );
    }

    this.logger.debug('Setting up Gmail filter', { projectId: project.id });

    const filter = await this.googleService.createGmailFilter({
      userId: userId,
      criteria: { from: project.email_alias },
      labelId: project.google_label_id,
    });

    this.logger.debug('Gmail filter created', { filterId: filter.id });

    await this.projectRepository.update(project.id, {
      google_filter_id: filter.id,
    });

    this.logger.debug('Gmail filter updated', { projectId: project.id });

    return true;
  }
}
