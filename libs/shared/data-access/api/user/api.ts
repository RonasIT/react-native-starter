import { plainToInstance } from 'class-transformer';
import { axiosBaseQuery, createAppApi } from '../../api-client';
import { PaginationResponse, createEntityApi } from '../../entity-api';
import { Pagination } from '../../entity-api/models/pagination';
import { User } from './models';

export const userAPI = createEntityApi<User>({
  entityName: 'user',
  baseApiCreator: createAppApi,
  baseQuery: axiosBaseQuery,
  baseEndpoint: '/users',
  entityConstructor: User
}).enhanceEndpoints({
  endpoints: {
    searchInfinite: {
      transformResponse: (response) => {
        const { data, pagination: meta } = plainToInstance(PaginationResponse, response);
        const instancesData = data.map((item) => plainToInstance(User, item));
        const demoPaginationData = (meta as any).pagination;
        const pagination = new Pagination({
          currentPage: demoPaginationData.page,
          total: demoPaginationData.total,
          perPage: demoPaginationData.limit,
          lastPage: demoPaginationData.pages
        });

        return { data: instancesData, pagination };
      }
    }
  }
});
