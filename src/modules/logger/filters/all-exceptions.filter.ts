import { Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}

process.on('uncaughtException', (error) => {
  console.error('uncaughtException: ', error);
  Logger.error('uncaughtException', error.stack);
  process.exit(1);
});
