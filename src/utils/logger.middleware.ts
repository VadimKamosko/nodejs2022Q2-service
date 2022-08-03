import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { createWriteStream, stat, WriteStream } from 'fs';
import { NextFunction, Request, Response } from 'express';
import internal, { Stream } from 'stream';

@Injectable()
export class MyLogger implements NestMiddleware {
  constructor() {
    this.createNewStream();
  }
  private pathLog = './logs/log.txt';
  private logger = new Logger('HTTP');
  private writeableStream: WriteStream;
  private readable: internal.Readable;
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
    stat(this.pathLog, (err, stat) => {
      if (stat.size >= +process.env.LOGSIZE) {
        this.destroyStreams();
        this.createNewStream();
      }
      this.readable.push(answer + '\n');
    });
  }
  createNewStream() {
    this.readable = new Stream.Readable({ read() {} });
    this.pathLog = './logs/log' + new Date().valueOf() + '.txt';
    this.writeableStream = createWriteStream(this.pathLog, {
      flags: 'a',
    });
    this.readable.pipe(this.writeableStream);
  }
  destroyStreams() {
    this.readable.unpipe(this.writeableStream);
    this.writeableStream.destroy();
    this.readable.destroy();
  }
}
