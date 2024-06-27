import { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

export const formDataInterceptor =
  () => (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (config.data instanceof FormData && config.headers) {
      (config?.headers as RawAxiosRequestHeaders)['Content-Type'] = 'multipart/form-data';
    }

    return config;
  }; //TODO workaround https://github.com/axios/axios/issues/4823#issuecomment-1257921875
