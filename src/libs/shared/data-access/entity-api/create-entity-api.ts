import { createApi } from '@reduxjs/toolkit/query/react';
import { ClassConstructor, instanceToPlain, plainToInstance } from 'class-transformer';
import { isUndefined, last, merge, omit, omitBy, pickBy } from 'lodash';
import { EntityTagID } from './enums';
import { BaseEntity, EntityRequest, PaginationRequest, PaginationResponse } from './models';
import { EntityApi, EntityPartial } from './types';
import { BaseQueryFunction, createApiCreator, createEntityInstance, normalizeObject } from './utils';

export function createEntityAPI<
  TEntity extends BaseEntity,
  TSearchRequest extends PaginationRequest = PaginationRequest,
  TEntityRequest extends EntityRequest = EntityRequest
>(options: {
  entityName: string;
  baseEndpoint: string;
  baseApiCreator?: ReturnType<typeof createApiCreator>;
  baseQuery?: BaseQueryFunction;
  entityConstructor: ClassConstructor<TEntity>;
  entitySearchRequestConstructor?: ClassConstructor<TSearchRequest>;
  entityGetRequestConstructor?: ClassConstructor<TEntityRequest>;
}): EntityApi<TEntity, TSearchRequest, TEntityRequest> {
  const {
    entityName,
    baseEndpoint,
    baseApiCreator,
    baseQuery,
    entityConstructor,
    entitySearchRequestConstructor = PaginationRequest,
    entityGetRequestConstructor = EntityRequest
  } = options;

  if (!baseQuery && !baseApiCreator) {
    throw new Error('Passing "baseQuery" or "baseApiCreator" is required in when using "createEntityAPI"!');
  }

  const initApi = (baseApiCreator as typeof createApi) || createApi;

  const api = initApi({
    reducerPath: entityName,
    baseQuery: baseQuery as BaseQueryFunction,
    tagTypes: [entityName, EntityTagID.LIST],
    endpoints: (builder) => ({
      create: builder.mutation<TEntity, Partial<TEntity>>({
        query: (params) => {
          let formattedParams;

          if (params instanceof FormData) {
            formattedParams = params;
          } else {
            const request = createEntityInstance(entityConstructor, params, { fromInstancePartial: true });
            const files = pickBy(params, (value) => value instanceof File);

            formattedParams = {
              ...request,
              ...files
            };
          }

          return {
            method: 'post',
            url: baseEndpoint,
            data: formattedParams
          };
        },
        async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
          const createdEntity = await queryFulfilled;
          const invalidatedListsTags = api.util.selectInvalidatedBy(getState(), [{ type: entityName, id: EntityTagID.LIST }]);

          for (const tag of invalidatedListsTags) {
            if (tag.endpointName !== 'searchInfinite') {
              continue;
            }

            const originalArgs = tag.originalArgs;
            const entityRequest = createEntityInstance<TEntityRequest>(
              entityGetRequestConstructor as ClassConstructor<TEntityRequest>,
              originalArgs,
              { convertFromInstance: entitySearchRequestConstructor as ClassConstructor<TSearchRequest> }
            );
            const fullEntity = await dispatch(
              api.endpoints.get.initiate({ id: createdEntity.data.id, params: entityRequest }, { forceRefetch: true })
            ).unwrap();

            dispatch(
              api.util.updateQueryData('searchInfinite', originalArgs, (draft) => {
                const responseIndex = draft.findIndex((response) => (response.data as Array<TEntity>).find((item) => item.id === createdEntity.data.id));

                if (responseIndex === -1) {
                  (draft[0].data as Array<TEntity>).unshift(fullEntity);
                }
              })
            );
          }
        },
        transformResponse: (response: object) => createEntityInstance<TEntity>(entityConstructor, response),
        invalidatesTags: (_result, error) => (!error ? [{ type: entityName, id: EntityTagID.LIST }] : [])
      }),

      search: builder.query<PaginationResponse<TEntity>, TSearchRequest>({
        query: (params) => {
          const request = new entitySearchRequestConstructor(params || {}) as TSearchRequest;

          return {
            method: 'get',
            url: baseEndpoint,
            params: omitBy(instanceToPlain<TSearchRequest>(request), isUndefined)
          };
        },
        serializeQueryArgs: ({ queryArgs }) => {
          const request = new entitySearchRequestConstructor(queryArgs || {}) as TSearchRequest;

          return normalizeObject(request);
        },
        async onQueryStarted(request: TSearchRequest, { dispatch, queryFulfilled }) {
          const { data: response } = await queryFulfilled;

          const entityRequest = createEntityInstance<TEntityRequest>(
            entityGetRequestConstructor as ClassConstructor<TEntityRequest>,
            request,
            { convertFromInstance: entitySearchRequestConstructor as ClassConstructor<TSearchRequest> }
          );

          for (const entity of response.data) {
            dispatch(api.util.upsertQueryData('get', { id: entity.id, params: entityRequest }, entity));
          }
        },
        transformResponse: (response) => {
          const { data, ...pagination } = plainToInstance(PaginationResponse, response);

          return {
            ...pagination,
            data: data.map((item) => createEntityInstance<TEntity>(entityConstructor, item))
          } as PaginationResponse<TEntity>;
        },
        providesTags: (result) => result?.data
          ? [
            { type: entityName, id: EntityTagID.LIST },
            ...result.data.map((item) => ({ type: entityName, id: item.id }))
          ]
          : [entityName]
      }),

      searchInfinite: builder.query<Array<PaginationResponse<TEntity>>, TSearchRequest>({
        query: (params) => {
          const request = new entitySearchRequestConstructor(params || {}) as TSearchRequest;

          return {
            method: 'get',
            url: baseEndpoint,
            params: omitBy(instanceToPlain<TSearchRequest>(request), isUndefined)
          };
        },
        serializeQueryArgs: ({ queryArgs }) => {
          const request = new entitySearchRequestConstructor(queryArgs || {}) as TSearchRequest;

          return normalizeObject(omit(request, ['page']));
        },
        forceRefetch: ({ currentArg, previousArg }) => currentArg?.page !== previousArg?.page,
        async onQueryStarted(request: TSearchRequest, { dispatch, queryFulfilled }) {
          const { data: response } = await queryFulfilled;

          const entityRequest = createEntityInstance<TEntityRequest>(
            entityGetRequestConstructor as ClassConstructor<TEntityRequest>,
            request,
            { convertFromInstance: entitySearchRequestConstructor as ClassConstructor<TSearchRequest> }
          );

          for (const entity of response[0].data) {
            dispatch(api.util.upsertQueryData('get', { id: entity.id, params: entityRequest }, entity));
          }
        },
        transformResponse: (response) => {
          const { data, ...pagination } = plainToInstance(PaginationResponse, response);

          return [
            {
              ...pagination,
              data: data.map((item) => createEntityInstance<TEntity>(entityConstructor, item))
            } as PaginationResponse<TEntity>
          ];
        },
        providesTags: (result) => result?.[0]?.data
          ? [
            { type: entityName, id: EntityTagID.LIST },
            ...result[0].data.map((item) => ({ type: entityName, id: item.id }))
          ]
          : [entityName],
        merge: (currentCacheData, responseData) => {
          const newResponse = responseData[0];
          const index = currentCacheData.findIndex((response) => response.currentPage === newResponse.currentPage);

          if (index !== -1) {
            currentCacheData[index] = newResponse;

            return;
          }

          if (newResponse.currentPage < currentCacheData[0].currentPage) {
            currentCacheData.unshift(newResponse);
          }

          if (last(currentCacheData).currentPage < newResponse.currentPage) {
            currentCacheData.push(newResponse);
          }

          for (let i = 0; i < currentCacheData.length - 1; i++) {
            if (
              currentCacheData[i].currentPage < newResponse.currentPage &&
              newResponse.currentPage < currentCacheData[i + 1].currentPage
            ) {
              const beginning = currentCacheData.slice(0, i);
              const end = currentCacheData.slice(i, currentCacheData.length);
              currentCacheData = [...beginning, newResponse, ...end];

              return;
            }
          }
        }
      }),

      get: builder.query<TEntity, { id: TEntity['id']; params?: TEntityRequest }>({
        query: ({ id, params }) => {
          const request = new entityGetRequestConstructor(params || {}) as TEntityRequest;

          return {
            method: 'get',
            url: `${baseEndpoint}/${id}`,
            params: omitBy(instanceToPlain<TEntityRequest>(request), isUndefined)
          };
        },
        serializeQueryArgs: ({ queryArgs: { id, params } }) => {
          const request = new entityGetRequestConstructor(params || {}) as TEntityRequest;

          return normalizeObject({ id, params: request });
        },
        merge: (existing, incoming) => merge(existing, incoming),
        transformResponse: (response: object) => createEntityInstance<TEntity>(entityConstructor, response),
        providesTags: (result) => (result ? [{ type: entityName, id: result.id }] : [entityName])
      }),

      update: builder.mutation<EntityPartial<TEntity>, EntityPartial<TEntity>>({
        query: (params) => {
          const updatedEntity = createEntityInstance(entityConstructor, params, {
            fromInstancePartial: true
          }) as TEntity;
          const request = instanceToPlain(updatedEntity);

          return {
            method: 'put',
            url: `${baseEndpoint}/${request.id}`,
            data: request
          };
        },
        async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
          const updatedEntity = await queryFulfilled;

          const invalidatedListsTags = api.util.selectInvalidatedBy(getState(), [{ type: entityName, id: EntityTagID.LIST }]);

          for (const tag of invalidatedListsTags) {
            if (!['search', 'searchInfinite'].includes(tag.endpointName)) {
              continue;
            }

            const originalArgs = tag.originalArgs;
            const entityRequest = createEntityInstance<TEntityRequest>(
              entityGetRequestConstructor as ClassConstructor<TEntityRequest>,
              originalArgs,
              { convertFromInstance: entitySearchRequestConstructor as ClassConstructor<TSearchRequest> }
            );
            const fullEntity = await dispatch(
              api.endpoints.get.initiate({ id: updatedEntity.data.id, params: entityRequest }, { forceRefetch: true })
            ).unwrap();

            if (tag.endpointName === 'search') {
              dispatch(
                api.util.updateQueryData('search', originalArgs, (draft) => {
                  const itemIndex = (draft.data as Array<TEntity>).findIndex((item) => item.id === fullEntity.id);

                  if (itemIndex !== -1) {
                    (draft.data as Array<TEntity>)[itemIndex] = fullEntity;
                  }
                })
              );
            } else {
              dispatch(
                api.util.updateQueryData('searchInfinite', originalArgs, (draft) => {
                  const responseIndex = draft.findIndex((response) => (response.data as Array<TEntity>).find((item) => item.id === fullEntity.id));

                  if (responseIndex !== -1) {
                    const responseItems = draft[responseIndex].data as Array<TEntity>;
                    draft[responseIndex].data = responseItems.map((item) => item.id === fullEntity.id ? fullEntity : item);
                  }
                })
              );
            }
          }
        },
        transformResponse: (response: object | undefined, _error, arg) => response
          ? createEntityInstance<TEntity>(entityConstructor, response)
          : (createEntityInstance(entityConstructor, arg, { fromInstancePartial: true }) as TEntity),
        invalidatesTags: (_result, error, arg) => !error
          ? [
            { type: entityName, id: arg.id },
            { type: entityName, id: EntityTagID.LIST }
          ]
          : []
      }),

      delete: builder.mutation<void, number>({
        query: (id) => ({
          method: 'delete',
          url: `${baseEndpoint}/${id}`
        }),
        async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
          const invalidatedListsTags = api.util.selectInvalidatedBy(getState(), [{ type: entityName, id: EntityTagID.LIST }]);

          for (const tag of invalidatedListsTags) {
            if (tag.endpointName !== 'searchInfinite') {
              continue;
            }

            const originalArgs = tag.originalArgs;
            const patchSearchResult = dispatch(
              api.util.updateQueryData('searchInfinite', originalArgs, (draft) => {
                const responseIndex = draft.findIndex((response) => (response.data as Array<TEntity>).find((item) => item.id === id));

                if (responseIndex !== -1) {
                  const responseItems = draft[responseIndex].data as Array<TEntity>;
                  draft[responseIndex].data = responseItems.filter((item) => item.id !== id);
                }
              })
            );
            queryFulfilled.catch(patchSearchResult.undo);
          }
        },
        invalidatesTags: (_result, error) => (!error ? [{ type: entityName, id: EntityTagID.LIST }] : [])
      })
    })
  });

  return api as unknown as EntityApi<TEntity, TSearchRequest, TEntityRequest>;
}
