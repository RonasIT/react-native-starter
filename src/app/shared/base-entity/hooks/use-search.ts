import { useQuery, useQueryClient, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PaginationRequest, PaginationResponse } from '@shared/pagination';
import { Entity, EntityName } from '../config';
import { EntityPromiseService } from '../promise-service';
import { queriesKeys } from '../queries-keys';

interface UseSearchParams<
  TEntity extends Entity = Entity,
  TSearchRequest extends Record<string, any> = PaginationRequest
> extends Omit<UseQueryOptions<PaginationResponse<TEntity>, AxiosError>, 'queryKey' | 'queryFn'> {
  entityName: EntityName;
  entityService: EntityPromiseService<TEntity, TSearchRequest>;
  searchRequest?: TSearchRequest;
}

export function useSearch<
  TEntity extends Entity = Entity,
  TSearchRequest extends Record<string, any> = PaginationRequest
>({
  entityName,
  entityService,
  searchRequest,
  ...restParams
}: UseSearchParams<TEntity, TSearchRequest>): UseQueryResult<PaginationResponse<TEntity>, AxiosError> {
  const queryClient = useQueryClient();

  return useQuery<PaginationResponse<TEntity>, AxiosError>({
    ...queriesKeys[entityName].search(searchRequest),
    queryFn: () => entityService.search(searchRequest),
    onSuccess: (response) => {
      for (const item of response.data) {
        queryClient.setQueryData(queriesKeys[entityName].get(item.id).queryKey, item);
      }
    },
    ...restParams
  });
}
