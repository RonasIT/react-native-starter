import { createQueryKeys } from '@lukemorales/query-key-factory';
import { PaginationRequest } from '@shared/pagination';
import { Entity, EntityName } from '../config';

type QueriesSchema = { [query: string]: null | ((...args: Array<any>) => Array<any>) };

export function createQueriesKeys<
  TEntity extends Entity = Entity,
  TSearchRequest extends PaginationRequest = PaginationRequest
>(entityName: EntityName, queries?: QueriesSchema): ReturnType<typeof createQueryKeys> {
  return createQueryKeys(entityName, {
    get: (id: TEntity['id']) => [id],
    search: (request: TSearchRequest) => [request],
    searchInfinite: (request: TSearchRequest) => [request],
    ...queries
  });
}
