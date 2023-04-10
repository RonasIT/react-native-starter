import {
  InfiniteData,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ClassConstructor } from 'class-transformer';
import { compact, last } from 'lodash';
import { EntityRequest } from '@shared/base-entity/models';
import { PaginationResponse } from '@shared/pagination';
import { Entity, EntityName } from '../config';
import { EntityPromiseService } from '../promise-service';
import { queriesKeys } from '../queries-keys';
import { EntityPartial } from '../types';

interface UseUpdateParams<TEntity extends Entity = Entity, TEntityRequest extends EntityRequest = EntityRequest>
  extends Omit<UseMutationOptions<EntityPartial<TEntity>, AxiosError, EntityPartial<TEntity>>, 'mutationFn'> {
  entityName: EntityName;
  entityService: EntityPromiseService<TEntity>;
  entityGetRequestConstructor?: ClassConstructor<TEntityRequest>;
}

export function useUpdate<TEntity extends Entity = Entity, TEntityRequest extends EntityRequest = EntityRequest>(
  options: UseUpdateParams<TEntity, TEntityRequest>
): UseMutationResult<EntityPartial<TEntity>, AxiosError, EntityPartial<TEntity>> {
  const { entityName, entityService, entityGetRequestConstructor = EntityRequest, ...restParams } = options;

  const queryClient = useQueryClient();

  return useMutation<EntityPartial<TEntity>, AxiosError, EntityPartial<TEntity>>({
    mutationFn: (params) => entityService.update(params),
    onSuccess: async (_, params) => {
      // TODO: Fix typings
      queryClient.invalidateQueries(compact(queriesKeys[entityName].search().queryKey));

      const searchInfiniteQueries = queryClient.getQueriesData<InfiniteData<PaginationResponse<TEntity>>>(
        compact(queriesKeys[entityName].searchInfinite().queryKey)
      );

      for (const query of searchInfiniteQueries) {
        const [queryKey, queryData] = query;

        // TODO: Test other params combinations
        const originalArgs = last(queryKey);
        const entityRequest = new entityGetRequestConstructor(originalArgs);

        const fullEntity = await queryClient.fetchQuery<TEntity>(queriesKeys[entityName].get(params.id).queryKey, {
          queryFn: () => entityService.get(params.id, entityRequest)
        });

        queryClient.setQueryData<InfiniteData<PaginationResponse<TEntity>>>(queryKey, {
          ...queryData,
          pages: queryData.pages.map((response) => response.data.find((item) => item.id === fullEntity.id)
            ? {
              ...response,
              data: response.data.map((item) => (item.id === fullEntity.id ? fullEntity : item))
            }
            : response)
        });
      }
    },
    ...restParams
  });
}
