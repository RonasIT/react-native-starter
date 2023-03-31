import {
  InfiniteData,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ClassConstructor } from 'class-transformer';
import { PaginationResponse } from '@shared/pagination';
import { Entity, EntityName } from '../config';
import { EntityRequest } from '../models';
import { EntityPromiseService } from '../promise-service';

interface UseCreateParams<TEntity extends Entity = Entity, TEntityRequest extends EntityRequest = EntityRequest>
  extends Omit<UseMutationOptions<TEntity, AxiosError, TEntity>, 'mutationFn'> {
  entityName: EntityName;
  entityService: EntityPromiseService<TEntity>;
  entityGetRequestConstructor?: ClassConstructor<TEntityRequest>;
}

export function useCreate<TEntity extends Entity = Entity, TEntityRequest extends EntityRequest = EntityRequest>(
  options: UseCreateParams<TEntity, TEntityRequest>
): UseMutationResult<TEntity, AxiosError, TEntity> {
  const { entityName, entityService, entityGetRequestConstructor = EntityRequest, ...restParams } = options;

  const queryClient = useQueryClient();

  return useMutation<TEntity, AxiosError, TEntity>({
    mutationFn: (params) => entityService.create(params),
    onSuccess: async (createdEntity) => {
      queryClient.invalidateQueries({ queryKey: [`${entityName}Search`] });

      const searchInfiniteQueries = queryClient.getQueriesData<InfiniteData<PaginationResponse<TEntity>>>([`${entityName}SearchInfinite`]);
      for (const query of searchInfiniteQueries) {
        const [queryKey, queryData] = query;

        const originalArgs = queryKey[1];
        const entityRequest = new entityGetRequestConstructor(originalArgs);

        const fullEntity = await queryClient.fetchQuery<TEntity>(
          [`${entityName}Get`, createdEntity.id, entityRequest],
          {
            queryFn: () => entityService.get(createdEntity.id, entityRequest)
          }
        );

        queryClient.setQueryData<InfiniteData<PaginationResponse<TEntity>>>(queryKey, {
          ...queryData,
          pages: queryData.pages.map((response, index) => index === 0
            ? {
              ...response,
              data: [fullEntity, ...response.data]
            }
            : response)
        });
      }
    },
    ...restParams
  });
}
