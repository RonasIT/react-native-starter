import { appConfig } from '@app/constants';
import { AxiosError, AxiosRequestConfig, Method } from 'axios';
import Axios from 'axios-observable';
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface';
import { Platform } from 'react-native';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  formUrlencodedParamsInterceptor,
  refreshTokenInterceptor,
  tokenInterceptor,
  unauthorizedInterceptor
} from './interceptors';
import { ApiCall } from './types';

export class ApiService {
  public readonly post: ApiCall;
  public readonly get: ApiCall;
  public readonly patch: ApiCall;
  public readonly put: ApiCall;
  public readonly delete: ApiCall;

  private readonly httpClient: Axios;

  constructor(baseURL: string = appConfig.api.root, baseConfig?: AxiosRequestConfig) {
    const config: AxiosRequestConfig = {
      baseURL,
      headers: { 'user-platform': Platform.OS },
      ...baseConfig
    };

    this.httpClient = Axios.create(config);

    if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      this.httpClient.interceptors.request.use(formUrlencodedParamsInterceptor);
    }
    this.httpClient.interceptors.request.use(tokenInterceptor);
    this.httpClient.interceptors.request.use(refreshTokenInterceptor);
    this.httpClient.interceptors.response.use(undefined, unauthorizedInterceptor);

    this.post = this.request('post');
    this.get = this.request('get');
    this.patch = this.request('patch');
    this.put = this.request('put');
    this.delete = this.request('delete');
  }

  public static isAxiosError<T>(error: AxiosError | any): error is AxiosError<T> {
    return error && error.isAxiosError;
  }

  private request(method: Method, httpClient: Axios = this.httpClient): ApiCall {
    function apiCall<T = any>(
      endpoint: string,
      data?: any,
      options?: AxiosRequestConfig & { fullResponse?: false }
    ): Observable<T>;
    function apiCall<T = any>(
      endpoint: string,
      data?: any,
      options?: AxiosRequestConfig & { fullResponse: true }
    ): AxiosObservable<T>;
    function apiCall<T = any>(
      endpoint: string,
      data?: any,
      options?: AxiosRequestConfig & { fullResponse?: boolean }
    ): Observable<T> | AxiosObservable<T> {
      const payload = ['get', 'delete'].includes(method) ? { params: data } : { data };

      return httpClient
        .request({ method, url: endpoint, ...options, ...payload })
        .pipe(map((res) => (options?.fullResponse ? res : res.data)));
    }

    return apiCall;
  }
}

export const apiService = new ApiService();
