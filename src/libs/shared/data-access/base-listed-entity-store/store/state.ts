import { Entity } from '../../base-entity/config';
import { Pagination, PaginationRequest } from '../../pagination';

export interface BaseListedEntityState<
  TEntity extends Entity = Entity,
  TFilters extends Record<string, any> | PaginationRequest = Record<string, any>
> {
  isLoading: boolean;
  isRefreshing: boolean;
  itemIDs: Array<TEntity['id']>;
  pagination: Pagination;
  filters?: TFilters;
}

export const baseListedInitialState: BaseListedEntityState = {
  itemIDs: [],
  pagination: new Pagination(),
  isLoading: false,
  isRefreshing: false
};