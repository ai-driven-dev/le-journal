import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiAuthOperation(summary: string): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({ status: 200, description: 'Successful operation' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}
