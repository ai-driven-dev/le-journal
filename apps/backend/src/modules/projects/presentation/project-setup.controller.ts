import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SetupProjectLabelUseCase } from '../application/setup-project-label.use-case';

import { GetUser } from 'src/infrastructure/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/infrastructure/auth/guards/jwt.guard';
import { UserDomain } from 'src/modules/users/domain/user.domain';

@ApiTags('Project Setup')
@Controller('api/project/setup')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProjectSetupController {
  constructor(private readonly setupProjectLabelUseCase: SetupProjectLabelUseCase) {}

  @Post('label')
  @ApiOperation({ summary: 'Setup project label.' })
  @ApiResponse({ status: 200, type: Boolean })
  @ApiBody({
    schema: {
      properties: {
        projectId: { type: 'string', example: 'c123e456-789b-12d3-a456-426614174000' },
      },
    },
  })
  async setupProjectLabel(
    @GetUser() user: UserDomain,
    @Body('projectId') projectId: string,
  ): Promise<boolean> {
    return await this.setupProjectLabelUseCase.execute(user.id, projectId);
  }
}
