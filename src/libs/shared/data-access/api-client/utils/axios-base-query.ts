import { RawAxiosRequestHeaders } from 'axios';
import { AuthSelectors } from '@libs/shared/data-access/api/auth/store/selectors';
import { AppState } from '@libs/shared/data-access/store/types';
import { AxiosBaseQueryArgs, BaseQueryFunction, createAxiosBaseQuery } from '../../entity-api';
import { apiService } from '../service';

const prepareApiRequestHeaders: AxiosBaseQueryArgs['prepareHeaders'] = ({ getState }): RawAxiosRequestHeaders => {
  const accessToken = AuthSelectors.token(getState() as AppState);

  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};

export const axiosBaseQuery: BaseQueryFunction = createAxiosBaseQuery({
  httpClient: apiService.httpClient,
  prepareHeaders: prepareApiRequestHeaders
});
