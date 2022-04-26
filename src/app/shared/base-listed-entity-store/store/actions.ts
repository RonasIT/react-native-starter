import { Entity, EntityName } from '@shared/base-entity/config';
import { EntityStoreActions } from '@shared/base-entity/store';
import { EntityPartial } from '@shared/base-entity/types';
import { PaginationResponse } from '@shared/pagination';
import { createAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { BaseListedEntityState } from './state';

export abstract class BaseListedEntityActions<
  TState extends BaseListedEntityState = BaseListedEntityState,
  TEntity extends Entity = Entity
> extends EntityStoreActions {
  public resetState = createAction(
    `[${this.storeTag}] Reset state`
  );

  public refreshItems = createAction<{ page?: number } & TState['filters']>(
    `[${this.storeTag}] Refresh items`
  );

  public loadItems = createAction<{ page?: number } & TState['filters']>(
    `[${this.storeTag}] Load items`
  );

  public loadItemsSuccess = createAction<PaginationResponse<TEntity>>(
    `[${this.storeTag}] Load items success`
  );

  public loadItemsFailure = createAction<AxiosError>(
    `[${this.storeTag}] Load items failure`
  );

  public changeFilter = createAction<TState['filters']>(
    `[${this.storeTag}] Change filter`
  );

  public resetFilter = createAction(
    `[${this.storeTag}] Reset filter`
  );

  public changeSearchQuery = createAction<{ query: string }>(
    `[${this.storeTag}] Change search query`
  );

  public deleteItem = createAction<{ item: TEntity }>(
    `[${this.storeTag}] Delete item`
  );

  public deleteItemSuccess = createAction<{ item: { id: TEntity['id'] } & Partial<TEntity> }>(
    `[${this.storeTag}] Delete item success`
  );

  public deleteItemFailure = createAction<{ item: TEntity; error: AxiosError }>(
    `[${this.storeTag}] Delete item failure`
  );

  public updateItem = createAction<{ item: EntityPartial<TEntity> }>(
    `[${this.storeTag}] Update item`
  );

  public updateItemSuccess = createAction<{ item: EntityPartial<TEntity> }>(
    `[${this.storeTag}] Update item success`
  );

  public updateItemFailure = createAction<{ item: EntityPartial<TEntity>; error: AxiosError }>(
    `[${this.storeTag}] Update item failure`
  );

  constructor(
public readonly storeTag: string, public readonly entityName: EntityName
  ) {
    super(
      entityName
    );
  }
}
