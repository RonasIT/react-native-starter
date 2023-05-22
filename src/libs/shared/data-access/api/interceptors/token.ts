import { AxiosRequestConfig } from 'axios';
import { apiConfig } from '../config';

export const tokenInterceptor =
  (getToken: () => string) => (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (config.headers.Authorization) {
      return config;
    }

    const token = getToken();

    if (token && !apiConfig.publicEndpoints.includes(config.url)) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  };
