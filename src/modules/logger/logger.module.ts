import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { CustomLoggerService } from './logger.service';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    CustomLoggerService,
  ],
  exports: [CustomLoggerService],
})
export class LoggerModule {}
