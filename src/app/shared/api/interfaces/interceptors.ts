import { AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface Interceptors {
  request?: Array<Parameters<AxiosInterceptorManager<AxiosRequestConfig>['use']>>;
  response?: Array<Parameters<AxiosInterceptorManager<AxiosResponse>['use']>>;
}
