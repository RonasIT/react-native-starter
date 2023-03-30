/* const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage, refetch } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = 1 }) => userPromiseService.search({ page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.currentPage + 1,
    onSuccess: (data) => {
      const lastPage = last(data.pages);
      for (const item of lastPage.data) {
        queryClient.setQueryData(['user', item.id], item);
      }
    }
  });*/

import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  useQueryClient
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { last } from 'lodash';
import { PaginationRequest, PaginationResponse } from '@shared/pagination';
import { Entity, EntityName } from '../config';
import { EntityPromiseService } from '../promise-service';

interface UseSearchInfiniteParams<
  TEntity extends Entity = Entity,
  TSearchRequest extends Record<string, any> = PaginationRequest
> extends Omit<
    UseInfiniteQueryOptions<PaginationResponse<TEntity>, AxiosError>,
    'queryKey' | 'queryFn' | 'getNextPageParam' | 'getPreviousPageParam'
  > {
  entityName: EntityName;
  entityService: EntityPromiseService<TEntity, TSearchRequest>;
  searchRequest?: TSearchRequest;
}

export function useSearchInfinite<
  TEntity extends Entity = Entity,
  TSearchRequest extends Record<string, any> = PaginationRequest
>({
  entityName,
  entityService,
  searchRequest,
  ...restParams
}: UseSearchInfiniteParams<TEntity, TSearchRequest>): UseInfiniteQueryResult<PaginationResponse<TEntity>, AxiosError> {
  const queryClient = useQueryClient();

  return useInfiniteQuery<PaginationResponse<TEntity>, AxiosError>({
    queryKey: [`${entityName}SearchInfinite`],
    queryFn: ({ pageParam = 1 }) => entityService.search({
      page: pageParam,
      ...searchRequest
    }),
    getNextPageParam: (lastResponse) => lastResponse.currentPage + 1,
    getPreviousPageParam: (lastResponse) => lastResponse.currentPage - 1,
    onSuccess: (data) => {
      const lastResponse = last(data.pages);
      for (const item of lastResponse.data) {
        queryClient.setQueryData([`${entityName}Get`, item.id], item);
      }
    },
    ...restParams
  });
}
