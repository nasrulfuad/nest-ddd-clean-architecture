import { Pagination } from '@common/web/pagination/pagination';
import { PaginationImpl } from '@common/web/pagination/pagination-impl';
import { WebResponse, WebResponseAbstract } from '@common/web/web.response';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { catchError, map, Observable, throwError } from 'rxjs';

interface Response {
  statusCode: HttpStatus;
  responseTime: string;
}

interface DataResponsePagination<T> extends Response, Pagination<T> {}
interface ResponseDefault<T> extends Response, WebResponse<T> {}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(c: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    return next.handle().pipe(
      map((d: Pagination<unknown> | WebResponse<unknown>) => {
        const { statusCode } = c.switchToHttp().getResponse<ExpressResponse>();
        const responseTime = `${Date.now() - now}ms`;

        if (d instanceof PaginationImpl) {
          const { meta, webResponse } = d;

          return this.buildResponsePagination({
            responseTime,
            webResponse,
            statusCode,
            meta,
          });
        } else if (d instanceof WebResponseAbstract) {
          const { message, data } = d;

          return this.buildResponseDefault({
            responseTime,
            statusCode,
            message,
            data,
          });
        }

        console.log(d);

        throw new InternalServerErrorException('Response type is invalid');
      }),
      catchError((error) =>
        throwError(() => {
          const responseTime = `${Date.now() - now}ms`;

          if (error instanceof HttpException) {
            return this.buildErrorResponse(error, responseTime);
          }

          // TODO add error logger
          console.error(error);

          return new InternalServerErrorException({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong :(',
            error: 'Internal Server Error',
            responseTime,
          });
        }),
      ),
    );
  }

  buildResponsePagination(
    param: DataResponsePagination<any>,
  ): Readonly<ResponseDefault<unknown>> {
    const {
      statusCode,
      meta,
      responseTime,
      webResponse: { message, data },
    } = param;

    return Object.freeze({
      responseTime,
      statusCode,
      message,
      meta,
      data,
    });
  }

  buildResponseDefault(
    param: ResponseDefault<unknown>,
  ): Readonly<ResponseDefault<unknown>> {
    const { statusCode, message, responseTime, data } = param;

    return Object.freeze({
      responseTime,
      statusCode,
      message,
      data,
    });
  }

  buildErrorResponse(
    error: HttpException,
    responseTime: string,
  ): HttpException {
    return new HttpException(
      {
        ...(error.getResponse() as object),
        responseTime,
      },
      error.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
