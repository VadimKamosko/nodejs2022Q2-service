import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch(Error)
export class InternalServerErrorFilter implements ExceptionFilter {
    catch(exception: InternalServerErrorException, host: ArgumentsHost) {      
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
           
    response
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      message:"Something went wrong",
      path: request.url,
    });
    }
}