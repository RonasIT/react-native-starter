import { createReducer } from '@reduxjs/toolkit';
import { EntityStoreActions } from './actions';
import { entityAdapter } from './adapter';
import { entityNames, initEntitiesStore } from './state';

const initialState = initEntitiesStore();

export const entityStoreReducer = createReducer(initialState, (builder) => [
  ...entityNames.flatMap((entityName) => {
    const actions = new EntityStoreActions(entityName);

    builder
      .addCase(actions.created, (state, { payload }) => {
        entityAdapter.addOne(state[entityName], payload.item);
      })
      .addCase(actions.loaded, (state, { payload }) => {
        entityAdapter.upsertMany(state[entityName], payload.items);
      })
      .addCase(actions.updated, (state, { payload }) => {
        entityAdapter.upsertOne(state[entityName], payload.item);
      })
      .addCase(actions.deleted, (state, { payload }) => {
        entityAdapter.removeOne(state[entityName], payload.item.id);
      });
  })
]);
