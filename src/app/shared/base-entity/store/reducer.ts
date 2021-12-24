import { immutableMerge } from '@shared/immutable-merge';
import { createReducer } from 'deox';
import { compact, omit } from 'lodash';
import { BaseEntityPlain } from '../models';
import { EntityMap } from '../types';
import { EntityStoreActions } from './actions';
import { entityNames, initEntitiesStore } from './state';

const initialState = initEntitiesStore();

export const entityStoreReducer = createReducer(initialState, (handleAction) => [
  ...entityNames.flatMap((entityName) => {
    const actions = new EntityStoreActions(entityName);

    return [
      handleAction(actions.created, (state, { payload }) => ({
        ...state,
        [entityName]: {
          ...state[entityName],
          [payload.item.id]: payload.item
        }
      })),
      handleAction(actions.loaded, (state, { payload }) => {
        const entityItemsMap: EntityMap<BaseEntityPlain> = {};
        compact(payload?.items).forEach((item) => {
          entityItemsMap[item.id] = immutableMerge(state[entityName][item.id as number], item);
        });

        return {
          ...state,
          [entityName]: {
            ...state[entityName],
            ...(entityItemsMap as EntityMap<BaseEntityPlain<any>>)
          }
        };
      }),
      handleAction(actions.updated, (state, { payload }) => ({
        ...state,
        [entityName]: {
          ...state[entityName],
          [payload.item.id]: immutableMerge(state[entityName][payload.item.id as number], payload.item)
        }
      })),
      handleAction(actions.deleted, (state, { payload }) => ({
        ...state,
        [entityName]: omit(state[entityName], payload.item.id)
      }))
    ];
  })
]);
