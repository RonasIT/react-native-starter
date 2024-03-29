import { AxiosRequestConfig } from 'axios';
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface';
import { Observable } from 'rxjs';

type DataOnly = <T = any>(
  endpoint: string,
  data?: any,
  options?: AxiosRequestConfig & { fullResponse?: false },
) => Observable<T>;

type FullResponse = <T = any>(
  endpoint: string,
  data?: any,
  options?: AxiosRequestConfig & { fullResponse: true },
) => AxiosObservable<T>;

export type ApiCall = DataOnly & FullResponse;
