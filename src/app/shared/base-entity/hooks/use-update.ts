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
import { EntityPartial } from '../types';

interface UseUpdateParams<TEntity extends Entity = Entity>
  extends Omit<UseMutationOptions<EntityPartial<TEntity>, AxiosError, EntityPartial<TEntity>>, 'mutationFn'> {
  entityName: EntityName;
  entityService: EntityPromiseService<TEntity>;
}

export function useUpdate<TEntity extends Entity = Entity>({
  entityName,
  entityService,
  ...restParams
}: UseUpdateParams<TEntity>): UseMutationResult<EntityPartial<TEntity>, AxiosError, EntityPartial<TEntity>> {
  const queryClient = useQueryClient();

  return useMutation<EntityPartial<TEntity>, AxiosError, EntityPartial<TEntity>>({
    mutationFn: (params) => entityService.update(params),
    onSuccess: async (updatedEntity, params) => {
      queryClient.invalidateQueries({ queryKey: [`${entityName}Search`] });
      // TODO: use entity request params
      const fullEntity = await queryClient.fetchQuery<TEntity>([`${entityName}Get`, params.id]);

      const searchInfiniteData = queryClient.getQueryData<InfiniteData<PaginationResponse<TEntity>>>([`${entityName}SearchInfinite`]);
      if (searchInfiniteData) {
        queryClient.setQueryData<InfiniteData<PaginationResponse<TEntity>>>([`${entityName}SearchInfinite`], {
          ...searchInfiniteData,
          pages: searchInfiniteData.pages.map((response) => response.data.find((item) => item.id === fullEntity.id)
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
