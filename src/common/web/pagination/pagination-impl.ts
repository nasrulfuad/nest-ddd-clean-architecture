import { WebResponse } from '@common/web/web.response';
import { Pagination, PaginationMeta } from './pagination';

export class PaginationMetaImpl implements PaginationMeta {
  public totalPage: number;
  constructor(
    public page: number,
    public perPage: number,
    public totalItems: number,
  ) {
    this.totalPage = Math.ceil(totalItems / perPage);
  }
}

export class PaginationImpl<T> implements Pagination<T> {
  constructor(
    public webResponse: WebResponse<T[]>,
    public meta: PaginationMeta,
  ) {}
}
