import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { map, Observable } from 'rxjs';
import { Pagination } from '@common/web/pagination/pagination';
import { PaginationImpl } from '@common/web/pagination/pagination-impl';
import { WebResponse } from '@common/web/web.response';
import { WebResponseImpl } from '@common/web/web.response-impl';

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
        } else if (d instanceof WebResponseImpl) {
          const { message, data } = d;

          return this.buildResponseDefault({
            responseTime,
            statusCode,
            message,
            data,
          });
        }

        throw new InternalServerErrorException('Response type is invalid');
      }),
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
}
