import { immutableMerge } from '@shared/immutable-merge';
import { createReducer } from '@reduxjs/toolkit';
import { compact, omit } from 'lodash';
import { BaseEntityPlain } from '../models';
import { EntityMap } from '../types';
import { EntityStoreActions } from './actions';
import { entityNames, initEntitiesStore } from './state';

const initialState = initEntitiesStore();

export const entityStoreReducer = createReducer(initialState, (builder) => [
  ...entityNames.flatMap((entityName) => {
    const actions = new EntityStoreActions(entityName);

    builder
      .addCase(actions.created, (state, { payload }) => ({
        ...state,
        [entityName]: {
          ...state[entityName],
          [payload.item.id]: payload.item
        }
      }))
      .addCase(actions.loaded, (state, { payload }) => {
        const entityItemsMap: EntityMap<BaseEntityPlain> = {};
        compact(payload?.items).forEach((item) => {
          entityItemsMap[item.id] = immutableMerge(state[entityName][item.id as number], item);
        });

        state[entityName] = {
          ...state[entityName],
          ...(entityItemsMap as EntityMap<BaseEntityPlain<any>>)
        };
      })
      .addCase(actions.updated, (state, { payload }) => ({
        ...state,
        [entityName]: {
          ...state[entityName],
          [payload.item.id]: immutableMerge(state[entityName][payload.item.id as number], payload.item)
        }
      }))
      .addCase(actions.deleted, (state, { payload }) => {
        state[entityName] = omit(state[entityName], payload.item.id);
      });
  })
]);
