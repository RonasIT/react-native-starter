import { createApiCreator } from '@libs/shared/data-access/entity-api';
import { axiosBaseQueryWithTokenRefresh } from './axios-base-query-with-token-refresh';

export const createAppApi = createApiCreator({
  baseQuery: axiosBaseQueryWithTokenRefresh
});
