import { ConflictException } from '@nestjs/common';

interface GoogleErrorDetails {
  message: string;
  domain: string;
  reason: string;
}

export interface GoogleError {
  code: number;
  message: string;
  errors: GoogleErrorDetails[];
  status: string;
}

export class LabelAlreadyExistsException extends ConflictException {
  constructor(error: GoogleError) {
    super({
      statusCode: error.code,
      message: error.message,
      error: error.status,
      details: error.errors,
    });
  }
}
