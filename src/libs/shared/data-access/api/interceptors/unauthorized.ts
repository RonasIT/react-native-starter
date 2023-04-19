import { AxiosError, HttpStatusCode } from 'axios';
import { apiConfig } from '../config';

export const unauthorizedInterceptor =
  (options: { onError: (error?: AxiosError) => void }) => (error: any): Promise<never> => {
    const { publicEndpoints } = apiConfig;

    if (
      error.response?.status === HttpStatusCode.Unauthorized &&
      !publicEndpoints.includes(error.response.config.url)
    ) {
      options.onError(error);
    }

    return Promise.reject(error);
  };
