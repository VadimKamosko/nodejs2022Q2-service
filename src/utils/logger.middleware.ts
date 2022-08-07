import { Injectable, ConsoleLogger, NestMiddleware } from '@nestjs/common';
import { createWriteStream, mkdirSync, stat, WriteStream } from 'fs';
import { NextFunction, Request, Response } from 'express';
import internal, { Stream } from 'stream';

const lvllog = {
  0: 'off',
  1: 'error',
  2: 'log',
  3: 'debug',
};

@Injectable()
export class MyLogger implements NestMiddleware {
  constructor() {
    this.createNewStream();
    this.logLvl = +process.env.LOGLVL > 3 ? 3 : +process.env.LOGLVL;
    if (isNaN(this.logLvl)) this.logLvl = 1;
    mkdirSync('./logs', { recursive: true });
  }

  private pathLog: string;
  private logger = new ConsoleLogger();
  private logLvl: number;
  private writeableStream: WriteStream;
  private readable: internal.Readable;

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.setLogLevels([lvllog[this.logLvl]]);
    const { originalUrl, body, query } = req;
    res.on('finish', () => {
      const code = res.statusCode;
      const header =
        req.headers['authorization'] || req.headers['Authorization'];
      const answer = `Url:${originalUrl}, body:${JSON.stringify(
        body,
      )} Query:${JSON.stringify(query)}, Status:${code}`;

      this.logger.debug(`header:${header} ,user:${JSON.stringify(req.user)}`);

      if (!code.toString().startsWith('2')) {
        this.ErrorLogging(answer);
        this.logger.error(answer);
      } else this.logger.log(answer);
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
    this.readable = new Stream.Readable({
      read() {
        return;
      },
    });
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
