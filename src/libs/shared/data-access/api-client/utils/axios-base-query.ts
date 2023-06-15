import { BaseQueryFunction, createAxiosBaseQuery } from '../../entity-api';
import { apiService } from '../service';

export const axiosBaseQuery: BaseQueryFunction = createAxiosBaseQuery({
  httpClient: apiService.httpClient
});
