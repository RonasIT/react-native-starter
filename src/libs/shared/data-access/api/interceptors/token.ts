import { AxiosRequestConfig } from 'axios';

export const tokenInterceptor =
  (getToken: () => string) => (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (config.headers.Authorization) {
      return config;
    }

    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  };
