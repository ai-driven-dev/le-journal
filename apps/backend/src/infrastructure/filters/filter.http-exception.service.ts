import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { AppLogger } from '../logger/logger.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: AppLogger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    const httpStatus =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // Log avec le contexte approprié
    this.logger.error(
      exception instanceof HttpException ? exception.message : 'Internal server error',
      {
        service: request.url,
        method: request.method,
        metadata: {
          path: request.url,
          body: request.body,
          params: request.params,
          query: request.query,
          statusCode: httpStatus,
        },
        error: exception instanceof Error ? exception : new Error(String(exception)),
      },
    );

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(request),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
