import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { createWriteStream } from 'fs';
import { NextFunction, Request, Response } from 'express';
import { Stream } from 'stream';

@Injectable()
export class MyLogger implements NestMiddleware {
  private logger = new Logger('HTTP');
  private readable = new Stream.Readable({
    read() {},
  });
  private writeableStream = createWriteStream('./logs/log.txt', {
    flags: 'w',
  });
  use(req: Request, res: Response, next: NextFunction) {
    const { originalUrl, body, query } = req;
    res.on('finish', () => {
      const code = res.statusCode;
      const answer = `Url:${originalUrl}, body:${JSON.stringify(
        body,
      )} Query:${JSON.stringify(query)}, Status:${code}`;

      if (!code.toString().startsWith('2')) this.ErrorLogging(answer);

      this.logger.log(answer);
    });
    next();
  }
  ErrorLogging(answer: string) {
    this.writeableStream.on('error', (e) => {
      console.log(e);
    });
    this.readable.push(answer + '\n');
    this.readable.pipe(this.writeableStream);
  }
  catch(e) {
    console.log(e);
  }
}
