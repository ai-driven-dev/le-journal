import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt.guard';
import { UserDomain } from '../../../modules/users/domain/user.domain';
import { CheckOnboardingGuard } from '../application/check-onboarding.guard';
import { SetupProjectLabelUseCase } from '../application/setup-project-label.use-case';

import { GetUser } from 'src/infrastructure/auth/decorators/get-user.decorator';

@ApiTags('Project Setup')
@Controller('api/project/setup')
@UseGuards(JwtAuthGuard, CheckOnboardingGuard)
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
  @ApiResponse({
    status: 409,
    description: 'Label already exists',
  })
  async setupProjectLabel(
    @GetUser() user: UserDomain,
    @Body('projectId') projectId: string,
  ): Promise<boolean> {
    return await this.setupProjectLabelUseCase.execute(user.id, projectId);
  }

  @Post('filter')
  @ApiOperation({ summary: 'Setup project filter' })
  @ApiResponse({ status: 200 })
  async setupFilter(@Body() filterData: Record<string, unknown>): Promise<{ success: boolean }> {
    // TODO: Implement filter setup logic
    return { success: true };
  }

  @Post('test')
  @ApiOperation({ summary: 'Send test email' })
  @ApiResponse({ status: 200 })
  async sendTestEmail(@Body() emailData: Record<string, unknown>): Promise<{ success: boolean }> {
    // TODO: Implement test email logic
    return { success: true };
  }
}
