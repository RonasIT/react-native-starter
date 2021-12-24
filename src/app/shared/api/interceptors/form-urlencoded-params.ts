import { AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';

export const formUrlencodedParamsInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  config.data = stringify(config.data, { encodeValuesOnly: true });

  return config;
};
