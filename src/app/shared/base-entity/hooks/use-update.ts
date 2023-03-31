import {
  InfiniteData,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ClassConstructor } from 'class-transformer';
import { EntityRequest } from '@shared/base-entity/models';
import { PaginationResponse } from '@shared/pagination';
import { Entity, EntityName } from '../config';
import { EntityPromiseService } from '../promise-service';
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
    onSuccess: async (updatedEntity, params) => {
      queryClient.invalidateQueries({ queryKey: [`${entityName}Search`] });

      const searchInfiniteQueries = queryClient.getQueriesData<InfiniteData<PaginationResponse<TEntity>>>([`${entityName}SearchInfinite`]);
      for (const query of searchInfiniteQueries) {
        const [queryKey, queryData] = query;

        const originalArgs = queryKey[1];
        const entityRequest = new entityGetRequestConstructor(originalArgs);

        const fullEntity = await queryClient.fetchQuery<TEntity>([`${entityName}Get`, params.id], {
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
