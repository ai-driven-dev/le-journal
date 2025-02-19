import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../../infrastructure/auth/guards/jwt.guard';
import { UserDomain } from '../../../users/domain/user.domain';
import { CheckOnboardingGuard } from '../../application/guards/check-onboarding.guard';
import { SetupFilterUseCase } from '../../application/use-cases/setup-filter.use-case';
import { SetupProjectLabelUseCase } from '../../application/use-cases/setup-project-label.use-case';
import { SetupProjectDto } from '../project-setup.dto';

import { GetUser } from 'src/infrastructure/auth/decorators/get-user.decorator';

@ApiTags('Project Setup')
@Controller('api/project/setup')
@UseGuards(JwtAuthGuard, CheckOnboardingGuard)
export class ProjectSetupController {
  constructor(
    private readonly setupProjectLabelUseCase: SetupProjectLabelUseCase,
    private readonly setupFilterUseCase: SetupFilterUseCase,
  ) {}

  @Post('label')
  @ApiOperation({ summary: 'Setup project label.' })
  @ApiResponse({ status: 200, type: Boolean })
  @ApiBody({ type: SetupProjectDto })
  @ApiResponse({
    status: 409,
    description: 'Label already exists',
  })
  async setupProjectLabel(
    @GetUser() user: UserDomain,
    @Body() setupProjectDto: SetupProjectDto,
  ): Promise<boolean> {
    return await this.setupProjectLabelUseCase.execute(user.id, setupProjectDto.projectId);
  }

  @Post('filter')
  @ApiOperation({ summary: 'Setup project filter' })
  @ApiResponse({ status: 200, type: Boolean })
  @ApiBody({ type: SetupProjectDto })
  async setupFilter(
    @GetUser() user: UserDomain,
    @Body() setupProjectDto: SetupProjectDto,
  ): Promise<boolean> {
    return this.setupFilterUseCase.execute(user.id, setupProjectDto.projectId);
  }

  @Post('test')
  @ApiOperation({ summary: 'Send test email' })
  @ApiResponse({ status: 200 })
  async sendTestEmail(): Promise<{ success: boolean }> {
    // TODO: Implement test email logic
    return { success: true };
  }
}
