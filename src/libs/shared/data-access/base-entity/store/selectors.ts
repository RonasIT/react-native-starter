import { createSelector, Selector } from '@reduxjs/toolkit';
import { isFunction } from 'lodash';
import { AppState } from '@libs/shared/data-access/store';
import { createEntityInstance, Entities, Entity, EntityName } from '../config';
import { entityAdapterSelectors } from './adapter';
import { entityNames } from './state';

const castSelector = <TData>(dataOrSelector: TData | Selector<AppState, TData>): Selector<AppState, TData> => {
  return isFunction(dataOrSelector) ? dataOrSelector : () => dataOrSelector;
};
export class EntityItemsSelectors<TEntity extends Entity> {
  constructor(private entityName: EntityName) {}

  public item = (itemID: TEntity['id'] | Selector<AppState, TEntity['id']>) => {
    const selectID = castSelector<TEntity['id']>(itemID);

    return createSelector(
      this.selectFeature,
      selectID,
      (state, id) => createEntityInstance<TEntity>(
        this.entityName,
        entityAdapterSelectors.selectById(
          state,
          id
        )
      )
    );
  };

  public items = (itemIDs: Array<TEntity['id']> | Selector<AppState, Array<TEntity['id']>>) => {
    const selectIDs = castSelector<Array<TEntity['id']>>(itemIDs);

    return createSelector(
      this.selectFeature,
      selectIDs,
      (state, ids) => {
        const allIDs = entityAdapterSelectors.selectIds(state);
        const items: Array<TEntity> = [];

        ids.forEach((id) => {
          if (allIDs.includes(id)) {
            items.push(createEntityInstance<TEntity>(
              this.entityName,
              entityAdapterSelectors.selectById(
                state,
                id
              )
            ));
          }
        });

        return items;
      }
    );
  };

  private selectFeature = (state: AppState) => state.entityStore[this.entityName];
}

type EntityStoreSelectors = { [key in EntityName]: EntityItemsSelectors<Entities[key]> };

function createSelectors(): EntityStoreSelectors {
  const result: Partial<EntityStoreSelectors> = {};
  entityNames.forEach((entityName) => {
    result[entityName] = new EntityItemsSelectors(entityName) as EntityItemsSelectors<any>;
  });

  return result as EntityStoreSelectors;
}

export const entityStoreSelectors = createSelectors();
