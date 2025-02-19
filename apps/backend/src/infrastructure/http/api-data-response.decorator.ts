import { applyDecorators } from '@nestjs/common';
import type { ApiQueryOptions } from '@nestjs/swagger';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

export const ApiAuthOperation = function ApiAuthOperation(
  summary: string,
  options?: {
    type?: typeof ApiResponse.prototype.type;
    query?: ApiQueryOptions;
  },
): MethodDecorator {
  const { type } = options ?? {};

  const responseDecorators = [
    ApiResponse({
      status: 200,
      description: 'Opération réussie',
      type,
      isArray: Array.isArray(type),
    }),
    ApiResponse({ status: 401, description: 'Non autorisé' }),
  ];

  if (options?.query !== undefined) {
    responseDecorators.push(ApiQuery(options.query));
  }

  return applyDecorators(ApiOperation({ summary }), ...responseDecorators);
};
