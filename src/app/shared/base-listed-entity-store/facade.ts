import { Entity } from '@shared/base-entity/config';
import { Pagination } from '@shared/pagination';
import { useSelector } from 'react-redux';
import { Store } from 'redux';
import { BaseListedEntityActions, BaseListedEntitySelectors, BaseListedEntityState } from './store';

export abstract class BaseListedEntityFacade<
  TState extends BaseListedEntityState = BaseListedEntityState,
  TEntity extends Entity = Entity,
  TActions extends BaseListedEntityActions = BaseListedEntityActions,
  TSelectors extends BaseListedEntitySelectors = BaseListedEntitySelectors
> {
  public get pagination(): Pagination {
    return useSelector(this.selectors.pagination);
  }

  public get items(): Array<TEntity> {
    return useSelector(this.selectors.items) as Array<TEntity>;
  }

  public get filter(): TState['filters'] {
    return useSelector(this.selectors.filters);
  }

  public get hasNextPage(): boolean {
    return useSelector(this.selectors.hasNextPage);
  }

  public get hasNoItems(): boolean {
    return useSelector(this.selectors.hasNoItems);
  }

  public get isLoading(): boolean {
    return useSelector(this.selectors.isLoading);
  }

  public get isRefreshing(): boolean {
    return useSelector(this.selectors.isRefreshing);
  }

  constructor(protected store: Pick<Store, 'dispatch'>, protected actions: TActions, protected selectors: TSelectors) {}

  public changeSearchQuery(query: string): void {
    this.store.dispatch(this.actions.changeSearchQuery({ query }));
  }

  public loadItems(page?: number): void {
    this.store.dispatch(this.actions.loadItems({ page }));
  }

  public deleteItem(item: TEntity): void {
    this.store.dispatch(this.actions.deleteItem({ item }));
  }

  public refreshItems(): void {
    this.store.dispatch(this.actions.refreshItems({ page: 1 }));
  }
}
