import { MutationDefinition, QueryDefinition } from '@reduxjs/toolkit/dist/query/react';
import { plainToInstance } from 'class-transformer';
import { axiosBaseQuery, createAppApi } from '@libs/shared/data-access/api-client';
import {
  createEntityAPI,
  PaginationRequest,
  PaginationResponse,
  Pagination,
  BaseQueryFunction,
  EntityPartial
} from '@libs/shared/data-access/entity-api';
import { User } from './models';

// TODO: Demo class. Remove in real app
class UserResponse {
  public meta: any;
  public data: any;

  constructor(model: Partial<Response>) {
    Object.assign(this, model);
  }
}

export const userApi = createEntityAPI<User>({
  entityName: 'user',
  baseApiCreator: createAppApi,
  baseQuery: axiosBaseQuery,
  baseEndpoint: '/users',
  entityConstructor: User
}).enhanceEndpoints({
  endpoints: {
    searchInfinite: {
      transformResponse: (response) => {
        const { data, ...restResponse } = plainToInstance(PaginationResponse, response);
        const instancesData = data.map((item) => plainToInstance(User, item));
        const demoPaginationData = (restResponse as any).meta.pagination;
        const pagination = new Pagination({
          currentPage: demoPaginationData.page,
          total: demoPaginationData.total,
          perPage: demoPaginationData.limit,
          lastPage: demoPaginationData.pages
        });

        return [{ data: instancesData, ...pagination }];
      }
    } as QueryDefinition<PaginationRequest, BaseQueryFunction, string, Array<PaginationResponse<User>>>,
    get: {
      transformResponse: (response: UserResponse) => plainToInstance(User, response.data)
    } as QueryDefinition<{ id: number }, BaseQueryFunction, string, User>,
    create: {
      transformResponse: (response: UserResponse) => plainToInstance(User, response.data)
    } as MutationDefinition<Partial<User>, BaseQueryFunction, string, User>,
    update: {
      transformResponse: (response: UserResponse) => plainToInstance(User, response.data)
    } as MutationDefinition<EntityPartial<User>, BaseQueryFunction, string, EntityPartial<User>>
  }
});
