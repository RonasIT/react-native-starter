import { AppState } from '@store';
import { isFunction } from 'lodash';
import { createSelector, Selector } from '@reduxjs/toolkit';
import { createEntityInstance, Entities, Entity, EntityName } from '../config';
import { entityNames } from './state';
import { entityAdapterSelectors } from './adapter';

const castSelector = <TData>(dataOrSelector: TData | Selector<AppState, TData>): Selector<AppState, TData> => {
  return isFunction(dataOrSelector) ? dataOrSelector : () => dataOrSelector;
};
export class EntityItemsSelectors<TEntity extends Entity> {
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

  constructor(private entityName: EntityName) {}

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
