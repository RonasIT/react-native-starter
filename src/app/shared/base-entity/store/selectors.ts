import { AppState } from '@store';
import { isFunction } from 'lodash';
import { createSelector, Selector } from '@reduxjs/toolkit';
import { createEntityInstance, Entities, EntitiesState, Entity, EntityName } from '../config';
import { entityNames } from './state';

const selectFeature = (state: AppState): EntitiesState => state.entityStore;
const castSelector = <TData>(dataOrSelector: TData | Selector<AppState, TData>): Selector<AppState, TData> => {
  return isFunction(dataOrSelector) ? dataOrSelector : () => dataOrSelector;
};
export class EntityItemsSelectors<TEntity extends Entity> {
  public item = (itemID: TEntity['id'] | Selector<AppState, TEntity['id']>) => {
    const selectID = castSelector<TEntity['id']>(itemID);

    return createSelector(
      selectFeature,
      selectID,
      (state, id) => createEntityInstance<TEntity>(
        this.entityName,
        state[this.entityName].entities[id]
      )
    );
  };

  public items = (itemIDs: Array<TEntity['id']> | Selector<AppState, Array<TEntity['id']>>) => {
    const selectIDs = castSelector<Array<TEntity['id']>>(itemIDs);

    return createSelector(
      selectFeature,
      selectIDs,
      (state, ids) => {
        const items: Array<TEntity> = [];
        ids.forEach((id) => {
          if (state[this.entityName].entities[id]) {
            items.push(createEntityInstance<TEntity>(
              this.entityName,
              state[this.entityName].entities[id]
            ));
          }
        });

        return items;
      }
    );
  };

  constructor(private entityName: EntityName) {}
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
