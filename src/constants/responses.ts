import { HttpStatus } from '@nestjs/common';

export interface Response {
  statusCode: number;
  error?: string;
  message: string;
}

export const RESPONSES = {
  NOT_FOUND: {
    statusCode: HttpStatus.NOT_FOUND,
    error: 'Not Found',
    message: 'Entity with was not found',
  },
  UNPROCESSABLE_ENTITY: {
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'Unprocessable Entity',
    message: "Entity doesn't exist",
  },
  FORBIDDEN_PASSWORD: {
    statusCode: HttpStatus.FORBIDDEN,
    message: 'Old password is incorrect',
    error: 'Bad Request',
  },
  REMOVED: { statusCode: HttpStatus.NO_CONTENT, message: 'Removed' },
  CREATED: { statusCode: HttpStatus.CREATED, message: 'Created' },
};
