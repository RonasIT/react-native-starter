import { PatchCollection } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { ClassConstructor } from 'class-transformer';
import { merge } from 'lodash';
import { BaseEntity, EntityRequest, PaginationRequest, PaginationResponse } from '../models';
import {
  EntityApi,
  EntityApiUtils,
  EntityMutationEndpointName,
  EntityPartial,
  EntityQueryEndpointName
} from '../types';
import { createEntityInstance } from './create-entity-instance';

export const createEntityApiUtils = <
  TEntity extends BaseEntity,
  TPaginationRequest extends PaginationResponse<TEntity> = PaginationResponse<TEntity>,
  TSearchRequest extends PaginationRequest = PaginationRequest,
  TEntityRequest extends EntityRequest = EntityRequest
>(options: {
  api: EntityApi<TEntity, TPaginationRequest, TSearchRequest, TEntityRequest, Array<EntityMutationEndpointName>>;
  entitySearchRequestConstructor?: ClassConstructor<TSearchRequest> | typeof PaginationRequest;
  entityGetRequestConstructor?: ClassConstructor<TEntityRequest> | typeof EntityRequest;
}): EntityApiUtils<TEntity, TSearchRequest> => {
  const { entitySearchRequestConstructor = PaginationRequest, entityGetRequestConstructor = EntityRequest } = options;
  const api = options.api as EntityApi<
    TEntity,
    TPaginationRequest,
    TSearchRequest,
    TEntityRequest,
    Array<EntityMutationEndpointName>
  >;
  const entityName = api.reducerPath;

  const entityApiUtils: EntityApiUtils<TEntity, TSearchRequest> = {
    patchEntityQueries: async (entityData, { dispatch, getState }) => {
      const patchResults: Array<PatchCollection> = [];

      if (!entityData?.id) {
        return patchResults;
      }

      const cachedQueries = api.util.selectInvalidatedBy(getState(), [{ type: entityName, id: entityData.id }]);

      for (const { endpointName, originalArgs } of cachedQueries) {
        const action = api.util.updateQueryData(
          endpointName as EntityQueryEndpointName,
          originalArgs as any,
          (endpointData) => {
            if ('data' in endpointData && Array.isArray(endpointData.data)) {
              const existingItemIndex = endpointData.data.findIndex((item) => item.id === entityData.id);

              if (existingItemIndex > -1) {
                endpointData.data[existingItemIndex] = merge(endpointData.data[existingItemIndex], entityData);
              }
            } else {
              merge(endpointData, entityData);
            }
          }
        );

        const patchResult = dispatch(action);
        patchResults.push(patchResult);
      }

      return patchResults;
    },
    clearEntityQueries: async (id, { dispatch, getState }) => {
      const patchResults: Array<PatchCollection> = [];

      if (!id) {
        return patchResults;
      }

      const cachedQueries = api.util.selectInvalidatedBy(getState(), [{ type: entityName, id }]);

      for (const { endpointName, originalArgs } of cachedQueries) {
        const action = api.util.updateQueryData(
          endpointName as EntityQueryEndpointName,
          originalArgs as any,
          (endpointData) => {
            if ('data' in endpointData && Array.isArray(endpointData.data)) {
              const existingItemIndex = endpointData.data.findIndex((item) => item.id === id);

              if (existingItemIndex > -1) {
                endpointData.data.splice(existingItemIndex, 1);
              }
            }
          }
        );

        const patchResult = dispatch(action);
        patchResults.push(patchResult);
      }

      return patchResults;
    },
    handleEntityCreate: async (_args, { dispatch, queryFulfilled }) => {
      const { data: createdEntity } = await queryFulfilled;

      if (createdEntity?.id) {
        await dispatch(api.util.upsertQueryData('get', { id: createdEntity.id }, createdEntity));
      }
    },
    handleEntitySearch: async (request, { shouldUpsertEntityQueries = true, dispatch, queryFulfilled }) => {
      if (!shouldUpsertEntityQueries) {
        return;
      }

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
    handleEntityUpdate: async (arg, { optimistic, dispatch, queryFulfilled, getState }) => {
      const itemPatch = typeof arg === 'object' && arg.id ? arg : ({ id: arg } as EntityPartial<TEntity>);

      if (optimistic) {
        const patches = await entityApiUtils.patchEntityQueries(itemPatch, { dispatch, getState });

        queryFulfilled.catch(() => {
          patches.forEach((patch) => {
            patch.undo();
          });
        });
      } else {
        const updatedEntityData = (await queryFulfilled).data;

        await entityApiUtils.patchEntityQueries(updatedEntityData || itemPatch, { dispatch, getState });
      }
    },
    handleEntityDelete: async (id, { optimistic, dispatch, queryFulfilled, getState }) => {
      if (optimistic) {
        const patches = await entityApiUtils.clearEntityQueries(id, { dispatch, getState });

        queryFulfilled.catch(() => {
          patches.forEach((patch) => {
            patch.undo();
          });
        });
      } else {
        await queryFulfilled;

        await entityApiUtils.clearEntityQueries(id, { dispatch, getState });
      }
    }
  };

  return entityApiUtils;
};
