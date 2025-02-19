import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';

import { JwtAuthGuard } from '../../../../infrastructure/auth/guards/jwt.guard';
import { UserDomain } from '../../../users/domain/user.domain';
import { CheckOnboardingGuard } from '../../application/guards/check-onboarding.guard';
import { CompleteOnboardingUseCase } from '../../application/use-cases/setup/setup-complete-onboarding.use-case';
import { SetupFilterUseCase } from '../../application/use-cases/setup/setup-filter.use-case';
import { SetupProjectLabelUseCase } from '../../application/use-cases/setup/setup-project-label.use-case';
import { SetupTestEmailUseCase } from '../../application/use-cases/setup/setup-test-email.use-case';
import { SetupProjectDto } from '../project-setup.dto';

import { GetUser } from 'src/infrastructure/auth/decorators/get-user.decorator';

@ApiTags('Project Setup')
@Controller('api/project/setup')
@UseGuards(JwtAuthGuard, CheckOnboardingGuard, ThrottlerGuard)
export class ProjectSetupController {
  constructor(
    private readonly setupProjectLabelUseCase: SetupProjectLabelUseCase,
    private readonly setupFilterUseCase: SetupFilterUseCase,
    private readonly setupSendTestEmailUseCase: SetupTestEmailUseCase,
    private readonly setupCompleteOnboardingUseCase: CompleteOnboardingUseCase,
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
  @ApiOperation({ summary: 'Send test email and complete onboarding' })
  @ApiResponse({ status: 200, type: Boolean })
  @ApiBody({ type: SetupProjectDto })
  async setupTestEmail(
    @GetUser() user: UserDomain,
    @Body() setupProjectDto: SetupProjectDto,
  ): Promise<boolean> {
    // Send test email
    const emailSent = await this.setupSendTestEmailUseCase.execute(
      user.id,
      setupProjectDto.projectId,
    );

    await this.setupCompleteOnboardingUseCase.execute(setupProjectDto.projectId);

    return emailSent;
  }
}
