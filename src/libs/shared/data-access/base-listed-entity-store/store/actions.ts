import { AxiosError } from 'axios';
import { Entity, EntityName } from '@libs/shared/data-access/base-entity/config';
import { EntityStoreActions } from '@libs/shared/data-access/base-entity/store';
import { EntityPartial } from '@libs/shared/data-access/base-entity/types';
import { PaginationResponse } from '@libs/shared/data-access/pagination';
import { defineAction } from '@libs/shared/data-access/store/utils';
import { BaseListedEntityState } from './state';

export abstract class BaseListedEntityActions<
  TState extends BaseListedEntityState = BaseListedEntityState,
  TEntity extends Entity = Entity
> extends EntityStoreActions {
  public resetState = defineAction(
    `[${this.storeTag}] Reset state`
  );

  public refreshItems = defineAction<{ page?: number } & TState['filters']>(
    `[${this.storeTag}] Refresh items`
  );

  public loadItems = defineAction<{ page?: number } & TState['filters']>(
    `[${this.storeTag}] Load items`
  );

  public loadItemsSuccess = defineAction<PaginationResponse<TEntity>>(
    `[${this.storeTag}] Load items success`
  );

  public loadItemsFailure = defineAction<AxiosError>(
    `[${this.storeTag}] Load items failure`
  );

  public changeFilter = defineAction<TState['filters']>(
    `[${this.storeTag}] Change filter`
  );

  public resetFilter = defineAction(
    `[${this.storeTag}] Reset filter`
  );

  public changeSearchQuery = defineAction<{ query: string }>(
    `[${this.storeTag}] Change search query`
  );

  public deleteItem = defineAction<{ item: TEntity }>(
    `[${this.storeTag}] Delete item`
  );

  public deleteItemSuccess = defineAction<{ item: { id: TEntity['id'] } & Partial<TEntity> }>(
    `[${this.storeTag}] Delete item success`
  );

  public deleteItemFailure = defineAction<{ item: TEntity; error: AxiosError }>(
    `[${this.storeTag}] Delete item failure`
  );

  public updateItem = defineAction<{ item: EntityPartial<TEntity> }>(
    `[${this.storeTag}] Update item`
  );

  public updateItemSuccess = defineAction<{ item: EntityPartial<TEntity> }>(
    `[${this.storeTag}] Update item success`
  );

  public updateItemFailure = defineAction<{ item: EntityPartial<TEntity>; error: AxiosError }>(
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
