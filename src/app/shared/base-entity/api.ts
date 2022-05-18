import {
  Api,
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
  QueryDefinition
} from '@reduxjs/toolkit/query/react';
import { createEntityInstance, Entity, EntityName } from './config';
import { appConfig } from '@app/constants';
import { ClassConstructor, instanceToPlain, plainToInstance } from 'class-transformer';
import { PaginationRequest, PaginationResponse } from '@shared/pagination';
import { BaseEntityPlain, EntityRequest } from './models';
import { isUndefined, omitBy } from 'lodash';
import { EntityPartial } from './types';
import { coreModuleName } from '@reduxjs/toolkit/dist/query/core/module';
import { reactHooksModuleName } from '@reduxjs/toolkit/dist/query/react/module';

type BaseQueryFunction = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>;

export function createBaseEntityAPI<
  TEntity extends Entity = Entity,
  TSearchRequest extends Record<string, any> = PaginationRequest,
  TEntityRequest extends EntityRequest = EntityRequest
>(
  endpoint: string,
  entityName: EntityName,
  entitySearchRequestConstructor: ClassConstructor<TSearchRequest> = PaginationRequest as ClassConstructor<any>,
  entityGetRequestConstructor: ClassConstructor<TEntityRequest> = EntityRequest as ClassConstructor<any>
): Api<
  BaseQueryFunction,
  {
    create: MutationDefinition<TEntity, BaseQueryFunction, never, TEntity, EntityName>;
    search: QueryDefinition<TSearchRequest, BaseQueryFunction, never, PaginationResponse<TEntity>, EntityName>;
    get: QueryDefinition<{ id: TEntity['id']; params?: TEntityRequest }, BaseQueryFunction, never, TEntity, EntityName>;
    update: MutationDefinition<EntityPartial<TEntity>, BaseQueryFunction, never, EntityPartial<TEntity>, EntityName>;
    delete: MutationDefinition<number, BaseQueryFunction, never, void, EntityName>;
  },
  EntityName,
  never,
  typeof coreModuleName | typeof reactHooksModuleName
> {
  return createApi({
    reducerPath: entityName,
    baseQuery: fetchBaseQuery({ baseUrl: appConfig.api.root }),
    endpoints: (builder) => ({
      create: builder.mutation<TEntity, TEntity>({
        query: (params) => {
          const request = createEntityInstance(entityName, params, { fromInstancePartial: true });

          return {
            method: 'post',
            url: endpoint,
            params: instanceToPlain(request)
          };
        },
        transformResponse: (response: BaseEntityPlain) => createEntityInstance<TEntity>(entityName, response)
      }),
      search: builder.query<PaginationResponse<TEntity>, TSearchRequest>({
        query: (params) => {
          const request = new entitySearchRequestConstructor(omitBy<TSearchRequest>(params, isUndefined));

          return {
            method: 'get',
            url: endpoint,
            params: instanceToPlain<TSearchRequest>(request)
          };
        },
        transformResponse: (response) => {
          const { data, ...pagination } = plainToInstance(PaginationResponse, response);

          return {
            ...pagination,
            data: data.map((item) => createEntityInstance<TEntity>(entityName, item))
          } as PaginationResponse<TEntity>;
        }
      }),
      get: builder.query<TEntity, { id: TEntity['id']; params?: TEntityRequest }>({
        query: ({ id, params }) => {
          const request = new entityGetRequestConstructor(omitBy<TEntityRequest>(params, isUndefined));

          return {
            method: 'get',
            url: `endpoint/${id}`,
            body: instanceToPlain<TEntityRequest>(request)
          };
        },
        transformResponse: (response: BaseEntityPlain) => createEntityInstance<TEntity>(entityName, response)
      }),
      update: builder.mutation<EntityPartial<TEntity>, EntityPartial<TEntity>>({
        query: (params) => {
          const updatedEntity = createEntityInstance(entityName, params, { fromInstancePartial: true }) as TEntity;
          const request: BaseEntityPlain = instanceToPlain(updatedEntity) as BaseEntityPlain;

          return {
            method: 'put',
            url: `endpoint/${request.id}`,
            body: request
          };
        },
        transformResponse: (response: BaseEntityPlain, _, arg) => response
          ? createEntityInstance<TEntity>(entityName, response)
          : (createEntityInstance(entityName, arg, { fromInstancePartial: true }) as TEntity)
      }),
      delete: builder.mutation<void, number>({
        query: (id) => ({
          method: 'delete',
          url: `endpoint/${id}`
        })
      })
    })
  });
}
