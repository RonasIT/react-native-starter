import { createSelector, Selector } from '@reduxjs/toolkit';
import { Entity, EntityName } from '@libs/shared/data-access/base-entity/config';
import { entityStoreSelectors } from '@libs/shared/data-access/base-entity/store';
import { AppState } from '@libs/shared/data-access/store';
import { BaseListedEntityState } from './state';

export abstract class BaseListedEntitySelectors<
  TEntity extends Entity = Entity,
  TState extends BaseListedEntityState = BaseListedEntityState
> {
  public isLoading = createSelector(
    this.selectFeature,
    (state) => state.isLoading
  );

  public isRefreshing = createSelector(
    this.selectFeature,
    (state) => state.isRefreshing
  );

  public itemIDs = createSelector(
    this.selectFeature,
    (state) => state.itemIDs
  );

  public items = entityStoreSelectors[this.entityName].items(this.itemIDs) as any as Selector<AppState, Array<TEntity>>;

  public pagination = createSelector(
    this.selectFeature,
    (state) => state.pagination
  );

  public filters = createSelector(
    this.selectFeature,
    (state) => state.filters
  );

  public hasNextPage = createSelector(
    this.selectFeature,
    (state) => state.pagination.currentPage !== state.pagination.lastPage
  );

  public hasNoItems = createSelector(
    this.selectFeature,
    (state) => !state.isLoading && state.pagination.total === 0
  );

  constructor(public readonly selectFeature: (state: AppState) => TState, public readonly entityName: EntityName) {}
}
