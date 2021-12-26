import { appConfig } from '@app/constants';
import { AxiosError } from 'axios';
import { ApiResponseStatus } from '../enums';

export const unauthorizedInterceptor =
  (options: { onError: (error?: AxiosError) => void }) => (error: any): Promise<never> => {
    const { publicEndpoints } = appConfig.api;

    if (
      error.response?.status === ApiResponseStatus.UNAUTHORIZED &&
      !publicEndpoints.includes(error.response.config.url)
    ) {
      options.onError(error);
    }

    return Promise.reject(error);
  };
