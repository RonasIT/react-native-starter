import { Api, BaseQueryFn } from '@reduxjs/toolkit/dist/query';

export type AnyApi = Api<BaseQueryFn, any, string, string>;
