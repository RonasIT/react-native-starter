import {
  InfiniteData,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { compact } from 'lodash';
import { PaginationResponse } from '@shared/pagination';
import { Entity, EntityName } from '../config';
import { EntityPromiseService } from '../promise-service';
import { queriesKeys } from '../queries-keys';

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
      queryClient.invalidateQueries(compact(queriesKeys[entityName].search().queryKey));

      const searchInfiniteQueries = queryClient.getQueriesData<InfiniteData<PaginationResponse<TEntity>>>(
        compact(queriesKeys[entityName].searchInfinite().queryKey)
      );
      for (const query of searchInfiniteQueries) {
        const [queryKey, queryData] = query;
        queryClient.setQueryData<InfiniteData<PaginationResponse<TEntity>>>(queryKey, {
          ...queryData,
          pages: queryData.pages.map((response) => response.data.find((item) => item.id === id)
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
