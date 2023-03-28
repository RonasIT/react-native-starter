import axios, {
  AxiosError,
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
  Method
} from 'axios';
import { Platform } from 'react-native';
import { appConfig } from '@app/constants';
import { ApiPromiseCall } from './types';

export class ApiPromiseService {
  public readonly post: ApiPromiseCall;
  public readonly get: ApiPromiseCall;
  public readonly patch: ApiPromiseCall;
  public readonly put: ApiPromiseCall;
  public readonly delete: ApiPromiseCall;

  private readonly httpClient: AxiosInstance;

  constructor(baseURL: string = appConfig.api.root, baseConfig?: AxiosRequestConfig) {
    const config: AxiosRequestConfig = {
      baseURL,
      headers: { 'user-platform': Platform.OS },
      ...baseConfig
    };

    this.httpClient = axios.create(config);

    this.post = this.request('post');
    this.get = this.request('get');
    this.patch = this.request('patch');
    this.put = this.request('put');
    this.delete = this.request('delete');
  }

  public static isAxiosError<T>(error: AxiosError | any): error is AxiosError<T> {
    return error && error.isAxiosError;
  }

  public useInterceptors(interceptors: {
    request?: Array<Parameters<AxiosInterceptorManager<AxiosRequestConfig>['use']>>;
    response?: Array<Parameters<AxiosInterceptorManager<AxiosResponse>['use']>>;
  }): void {
    if (interceptors.request.length) {
      interceptors.request.forEach((interceptorPair) => {
        this.httpClient.interceptors.request.use(...interceptorPair);
      });
    }

    if (interceptors.response.length) {
      interceptors.response.forEach((interceptorPair) => {
        this.httpClient.interceptors.response.use(...interceptorPair);
      });
    }
  }

  private request(method: Method, httpClient: AxiosInstance = this.httpClient): ApiPromiseCall {
    function apiCall<T = any>(
      endpoint: string,
      data?: any,
      options?: AxiosRequestConfig & { fullResponse?: false }
    ): Promise<T>;
    function apiCall<T = any>(
      endpoint: string,
      data?: any,
      options?: AxiosRequestConfig & { fullResponse: true }
    ): Promise<AxiosResponse<T>>;
    async function apiCall<T = any>(
      endpoint: string,
      data?: any,
      options?: AxiosRequestConfig & { fullResponse?: boolean }
    ): Promise<AxiosResponse<T> | T> {
      const payload = ['get', 'delete'].includes(method) ? { params: data } : { data };

      try {
        const res = await httpClient.request({
          method,
          url: endpoint,
          ...options,
          ...payload
        });

        return options?.fullResponse ? res : res.data;
      } catch (error: any) {
        throw error.response;
      }
    }

    return apiCall;
  }
}

export const apiPromiseService = new ApiPromiseService();
