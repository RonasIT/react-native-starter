import { coreModuleName } from '@reduxjs/toolkit/dist/query/core/module';
import { reactHooksModuleName } from '@reduxjs/toolkit/dist/query/react/module';
import { Api, createApi, MutationDefinition, QueryDefinition } from '@reduxjs/toolkit/query/react';
import { ClassConstructor, instanceToPlain, plainToInstance } from 'class-transformer';
import { isUndefined, omitBy } from 'lodash';
import { PaginationRequest, PaginationResponse } from '@shared/pagination';
import { createEntityInstance, Entity, EntityName } from './config';
import { BaseEntityPlain, EntityRequest } from './models';
import { EntityPartial } from './types';
import { axiosBaseQuery, BaseQueryFunction } from './utils';

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
  EntityName, // TODO: Avoid duplicated entity name pass
  typeof coreModuleName | typeof reactHooksModuleName
> {
  const api = createApi({
    reducerPath: entityName,
    baseQuery: axiosBaseQuery(),
    tagTypes: [entityName],
    endpoints: (builder) => ({
      create: builder.mutation<TEntity, TEntity>({
        query: (params) => {
          const request = createEntityInstance(entityName, params, { fromInstancePartial: true });

          return {
            method: 'post',
            url: endpoint,
            body: instanceToPlain(request)
          };
        },
        transformResponse: (response: BaseEntityPlain) => createEntityInstance<TEntity>(entityName, response),
        invalidatesTags: (result, error, arg) => [{ type: entityName, id: arg.id }]
      }),
      search: builder.query<PaginationResponse<TEntity>, TSearchRequest>({
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const { data: response } = await queryFulfilled;
          for (const user of response.data) {
            dispatch(
              api.util.updateQueryData('get', { id: user.id }, (draft) => {
                Object.assign(draft, user);
              })
            );
          }
        },
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
        },
        providesTags: (result) => result?.data
          ? [...result.data.map(({ id }) => ({ type: entityName, id })), { type: entityName, id: 'list' }]
          : [entityName]
      }),
      get: builder.query<TEntity, { id: TEntity['id']; params?: TEntityRequest }>({
        query: ({ id, params }) => {
          const request = new entityGetRequestConstructor(omitBy<TEntityRequest>(params, isUndefined));

          return {
            method: 'get',
            url: `${endpoint}/${id}`,
            params: instanceToPlain<TEntityRequest>(request)
          };
        },
        transformResponse: (response: BaseEntityPlain) => createEntityInstance<TEntity>(entityName, response),
        providesTags: ({ id }) => [{ type: entityName, id }]
      }),
      update: builder.mutation<EntityPartial<TEntity>, EntityPartial<TEntity>>({
        query: (params) => {
          const updatedEntity = createEntityInstance(entityName, params, { fromInstancePartial: true }) as TEntity;
          const request: BaseEntityPlain = instanceToPlain(updatedEntity) as BaseEntityPlain;

          return {
            method: 'put',
            url: `${endpoint}/${request.id}`,
            body: request
          };
        },
        transformResponse: (response: BaseEntityPlain, error, arg) => response
          ? createEntityInstance<TEntity>(entityName, response)
          : (createEntityInstance(entityName, arg, { fromInstancePartial: true }) as TEntity),
        invalidatesTags: (result, error, arg) => [{ type: entityName, id: arg.id }]
      }),
      delete: builder.mutation<void, number>({
        query: (id) => ({
          method: 'delete',
          url: `${endpoint}/${id}`
        }),
        invalidatesTags: [{ type: entityName, id: 'list' }]
      })
    })
  });

  return api;
}
