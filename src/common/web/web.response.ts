export interface WebResponse<T> {
  message: string;
  data: T;
}

export abstract class WebResponseAbstract<T> implements WebResponse<T> {
  constructor(public message: string, public data: T) {}
}
