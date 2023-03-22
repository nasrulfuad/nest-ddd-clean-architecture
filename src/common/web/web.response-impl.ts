import { WebResponse } from './web.response';

export class WebResponseImpl<T> implements WebResponse<T> {
  constructor(public message: string, public data: T) {}
}
