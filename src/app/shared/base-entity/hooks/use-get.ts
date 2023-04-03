import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { UseQueryOptions } from '@tanstack/react-query/src/types';
import { AxiosError } from 'axios';
import { merge } from 'lodash';
import { Entity, EntityName } from '../config';
import { EntityRequest } from '../models';
import { EntityPromiseService } from '../promise-service';
import { queriesKeys } from '../queries-keys';

interface UseGetParams<TEntity extends Entity = Entity, TEntityRequest extends EntityRequest = EntityRequest>
  extends Omit<UseQueryOptions<TEntity, AxiosError>, 'queryKey' | 'queryFn'> {
  entityName: EntityName;
  entityService: EntityPromiseService<TEntity, unknown, TEntityRequest>;
  id: TEntity['id'];
  entityRequest?: TEntityRequest;
}

export function useGet<TEntity extends Entity = Entity, TEntityRequest extends EntityRequest = EntityRequest>({
  entityName,
  entityService,
  id,
  entityRequest,
  ...restParams
}: UseGetParams<TEntity, TEntityRequest>): UseQueryResult<TEntity, AxiosError> {
  const queryClient = useQueryClient();

  return useQuery<TEntity, AxiosError>({
    ...queriesKeys[entityName].get(id),
    queryFn: () => entityService.get(id, entityRequest),
    onSuccess: (newData) => {
      queryClient.setQueriesData(queriesKeys[entityName].get(id).queryKey, (oldData) => merge(oldData, newData));
    },
    ...restParams
  });
}
