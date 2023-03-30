import {
  InfiniteData,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PaginationResponse } from '@shared/pagination';
import { Entity, EntityName } from '../config';
import { EntityPromiseService } from '../promise-service';

interface UseCreateParams<TEntity extends Entity = Entity>
  extends Omit<UseMutationOptions<TEntity, AxiosError, TEntity>, 'mutationFn'> {
  entityName: EntityName;
  entityService: EntityPromiseService<TEntity>;
}

export function useCreate<TEntity extends Entity = Entity>({
  entityName,
  entityService,
  ...restParams
}: UseCreateParams<TEntity>): UseMutationResult<TEntity, AxiosError, TEntity> {
  const queryClient = useQueryClient();

  return useMutation<TEntity, AxiosError, TEntity>({
    mutationFn: (params) => entityService.create(params),
    onSuccess: async (createdEntity) => {
      queryClient.invalidateQueries({ queryKey: [`${entityName}Search`] });

      const searchInfiniteData = queryClient.getQueryData<InfiniteData<PaginationResponse<TEntity>>>([`${entityName}SearchInfinite`]);
      if (searchInfiniteData) {
        // TODO: use entity request params
        const fullEntity = await queryClient.fetchQuery<TEntity>([`${entityName}Get`, createdEntity.id], {
          queryFn: () => entityService.get(createdEntity.id)
        });

        queryClient.setQueryData<InfiniteData<PaginationResponse<TEntity>>>([`${entityName}SearchInfinite`], {
          ...searchInfiniteData,
          pages: searchInfiniteData.pages.map((response, index) => index === 0
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
