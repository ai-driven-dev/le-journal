import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiRedirectResponse = function ApiRedirectResponse(
  summary: string,
  redirectUrl: string,
  statusCode: number = 302,
): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({ status: statusCode, description: `Redirects to ${redirectUrl}` }),
  );
};
