import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // constructor(private myLogger: MyLogger) {}
  use(req: Request, res: Response, next: NextFunction) {
    const requestString = `${req.method} ${
      req.originalUrl
    } - ${this.bodyToString(req.body)}`;

    Logger.log(requestString, 'Request');

    res.on('close', () => {
      const responseString = `${req.method} ${req.originalUrl} - ${res.statusCode} (${res.statusMessage})`;
      Logger.log(responseString, 'Response');
    });

    next();
  }

  bodyToString(body: any) {
    const entries = Object.entries(body);
    const result = [];
    for (const element of entries) {
      const entry = `${element[0]}: ${element[1]}`;
      result.push(entry);
    }
    return `{ ${result.join(', ')} }`;
  }
}
