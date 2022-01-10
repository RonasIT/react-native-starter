import { Entity } from '@shared/base-entity/config';
import { Pagination, PaginationRequest } from '@shared/pagination';

export class BaseListedEntityState<
  TEntity extends Entity = Entity,
  TFilters extends Record<string, any> | PaginationRequest = Record<string, any>
> {
  public isLoading: boolean;
  public isRefreshing: boolean;
  public itemIDs: Array<TEntity['id']>;
  public pagination: Pagination;
  public filters: TFilters;

  constructor(initialFilters?: TFilters) {
    this.itemIDs = [];
    this.pagination = new Pagination();
    this.isLoading = true;
    this.isRefreshing = false;
    if (initialFilters) {
      this.filters = initialFilters;
    }
  }
}
