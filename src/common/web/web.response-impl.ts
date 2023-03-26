import { ClassConstructor, plainToClass } from 'class-transformer';
import { WebResponse, WebResponseAbstract } from './web.response';

class WebResponseImpl<T> extends WebResponseAbstract<T> {
  constructor(public message: string, public data: T) {
    super(message, data);
  }
}

export class WebResponseImplBuilder<T> {
  private webResponse: WebResponse<T>;

  constructor() {
    this.webResponse = new WebResponseImpl<T>('success', null);
  }

  setMessage(message: string): WebResponseImplBuilder<T> {
    this.webResponse.message = message;
    return this;
  }

  setData(data: T): WebResponseImplBuilder<T> {
    this.webResponse.data = data;
    return this;
  }

  build(): WebResponse<T> {
    return this.webResponse;
  }

  buildAndtransform(className: ClassConstructor<T extends Array<any> ? T[number] : T>): WebResponse<T> {
    this.webResponse.data = plainToClass(className, this.webResponse.data);
    return this.webResponse;
  }
}
