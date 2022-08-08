import { LogLevel } from '@nestjs/common';

export const DEFAULT_PORT = 4000;

export const DEFAULT_LOG_LEVELS: LogLevel[] = [
  'error',
  'warn',
  'log',
  'debug',
  'verbose',
];

export const LOG_PATH = 'logs';
