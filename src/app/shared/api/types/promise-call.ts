import { AxiosRequestConfig, AxiosResponse } from 'axios';

type DataOnly = <T = unknown>(
  endpoint: string,
  data?: any,
  options?: AxiosRequestConfig & { fullResponse?: false }
) => Promise<T>;

type FullResponse = <T = unknown>(
  endpoint: string,
  data?: any,
  options?: AxiosRequestConfig & { fullResponse: true }
) => Promise<AxiosResponse<T>>;

export type ApiPromiseCall = DataOnly & FullResponse;
