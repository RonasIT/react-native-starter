import { createApiCreator } from '@libs/shared/data-access/entity-api';
import { axiosBaseQuery } from './axios-base-query';

export const createAppApi = createApiCreator({
  baseQuery: axiosBaseQuery
});
