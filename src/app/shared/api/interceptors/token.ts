import { AuthSelectors } from '@shared/auth/store/selectors';
import { store } from '@store/store';
import { AxiosRequestConfig } from 'axios';

export const tokenInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  if (config.headers.Authorization) {
    return config;
  }

  const token = AuthSelectors.token(store.getState());

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
