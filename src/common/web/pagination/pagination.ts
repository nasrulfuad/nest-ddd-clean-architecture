import { WebResponse } from '@common/web/web.response';

export interface Pagination<T> {
  webResponse: WebResponse<T[]>;
  meta: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  totalPage: number;
  totalItems: number;
}
