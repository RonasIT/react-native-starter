import { BaseQueryFn, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';
import { appConfig } from '@app/constants';
import { Interceptors } from '@shared/api/interfaces';

export type BaseQueryFunction = BaseQueryFn<
  AxiosRequestConfig,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
>;

const httpClient = axios.create({
  baseURL: appConfig.api.root,
  headers: { 'user-platform': Platform.OS }
});

export function useAxiosBaseQueryInterceptors(interceptors: Interceptors): void {
  if (interceptors.request.length) {
    interceptors.request.forEach((interceptorPair) => {
      httpClient.interceptors.request.use(...interceptorPair);
    });
  }

  if (interceptors.response.length) {
    interceptors.response.forEach((interceptorPair) => {
      httpClient.interceptors.response.use(...interceptorPair);
    });
  }
}

export const axiosBaseQuery =
  (): BaseQueryFunction => async ({ url, method, data, params }) => {
    try {
      const result = await httpClient.request({ url, method, data, params });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message
        }
      };
    }
  };
