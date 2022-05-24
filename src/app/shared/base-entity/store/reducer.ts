import { createReducer } from '@reduxjs/toolkit';
import { EntityStoreActions } from './actions';
import { entityNames, initEntitiesStore } from './state';
import { entityAdapter } from './adapter';

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
        entityAdapter.updateOne(state[entityName], { id: payload.item.id, changes: payload.item });
      })
      .addCase(actions.deleted, (state, { payload }) => {
        entityAdapter.removeOne(state[entityName], payload.item.id);
      });
  })
]);
