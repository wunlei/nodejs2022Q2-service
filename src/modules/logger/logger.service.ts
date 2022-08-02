import { ConsoleLogger, Injectable, LogLevel, Scope } from '@nestjs/common';
import { appendFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { cwd } from 'node:process';
import { resolve } from 'path';
import { Buffer } from 'buffer';
import { DEFAULT_LOG_LEVELS, LOG_PATH } from '../../constants/app';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends ConsoleLogger {
  maxFileSize: number;
  dirPath: string;
  logsFilePath?: string;
  errorsFilePath?: string;

  constructor() {
    super();
    this.setLogLevelNumber(Number(process.env.LOG_LEVELS));
    this.maxFileSize = Number(process.env.LOG_FILE_SIZE);
    this.setupDir();
  }

  setupDir() {
    this.dirPath = resolve(cwd(), LOG_PATH);
    if (!existsSync(this.dirPath)) {
      mkdirSync(this.dirPath, { recursive: true });
    }
  }

  log(message: any, ...optionalParams: [...any, string?]) {
    super.log(message, optionalParams);
    this.writeToFile('log', message, optionalParams);
  }

  error(message: any, ...optionalParams: [...any, string?]) {
    const errorMessage = message.stack ? message.stack : message;
    super.error(message, optionalParams);
    this.writeToFile('error', errorMessage, optionalParams);
  }

  warn(message: any, ...optionalParams: [...any, string?]): void {
    super.warn(message, optionalParams);
    this.writeToFile('warn', message, optionalParams);
  }

  debug(message: any, ...optionalParams: [...any, string?]): void {
    super.debug(message, optionalParams);
    this.writeToFile('debug', message, optionalParams);
  }

  verbose(message: any, ...optionalParams: [...any, string?]): void {
    super.verbose(message, optionalParams);
    this.writeToFile('verbose', message, optionalParams);
  }

  setLogLevelNumber(level: number): void {
    const levels = DEFAULT_LOG_LEVELS.slice(0, level + 1);
    super.setLogLevels(levels);
  }

  writeToFile(
    level: LogLevel,
    message: any,
    ...optionalParams: [...any, string?]
  ) {
    if (!this.options.logLevels.includes(level)) {
      return;
    }

    const pid = process.pid;
    const logDate = this.getTimestamp();
    const logLevel = level.toUpperCase();
    const logOptional = optionalParams.join('');
    const logMessage = message ? message.toString() : '';
    const logToPrint = `${pid} - ${logDate} - ${logLevel} [ ${logOptional} ] ${logMessage}\n`;

    // console.log('optional', optionalParams.join(''));
    if (level === 'error') {
      if (this.errorsFilePath) {
        const fileStat = statSync(this.errorsFilePath);
        const fileSize = fileStat.size / 1024;
        const stringSize = Buffer.from(logToPrint).length / 1024;

        if (fileSize + stringSize > this.maxFileSize) {
          this.errorsFilePath = resolve(
            this.dirPath,
            `errors_${Date.now()}.log`,
          );
        }
      } else {
        this.errorsFilePath = resolve(this.dirPath, `errors_${Date.now()}.log`);
      }
      appendFileSync(this.errorsFilePath, logToPrint);
    } else {
      if (this.logsFilePath) {
        const fileStat = statSync(this.logsFilePath);
        const fileSize = fileStat.size / 1024;
        const stringSize = Buffer.from(logToPrint).length / 1024;

        if (fileSize + stringSize > this.maxFileSize) {
          this.logsFilePath = resolve(this.dirPath, `logs_${Date.now()}.log`);
        }
      } else {
        this.logsFilePath = resolve(this.dirPath, `logs_${Date.now()}.log`);
      }
      appendFileSync(this.logsFilePath, logToPrint);
    }
  }
}
