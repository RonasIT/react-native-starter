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

interface UseDeleteParams<TEntity extends Entity = Entity>
  extends Omit<UseMutationOptions<void, AxiosError, TEntity['id']>, 'mutationFn'> {
  entityName: EntityName;
  entityService: EntityPromiseService<TEntity>;
}

export function useDelete<TEntity extends Entity = Entity>({
  entityName,
  entityService,
  ...restParams
}: UseDeleteParams<TEntity>): UseMutationResult<void, AxiosError, TEntity['id']> {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, TEntity['id']>({
    mutationFn: (id) => entityService.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [`${entityName}Search`] });

      const searchInfiniteData = queryClient.getQueryData<InfiniteData<PaginationResponse<TEntity>>>([`${entityName}SearchInfinite`]);
      if (searchInfiniteData) {
        queryClient.setQueryData<InfiniteData<PaginationResponse<TEntity>>>([`${entityName}SearchInfinite`], {
          ...searchInfiniteData,
          pages: searchInfiniteData.pages.map((response) => response.data.find((item) => item.id === id)
            ? {
              ...response,
              data: response.data.filter((item) => item.id !== id)
            }
            : response)
        });
      }
    },
    ...restParams
  });
}
