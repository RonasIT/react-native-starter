import { keys } from 'lodash';
import { EntitiesState, ENTITIES_CONFIG, EntityName, Entities } from '../config';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { BaseEntityPlain } from '@shared/base-entity/models';

export const entityNames = keys(ENTITIES_CONFIG) as Array<EntityName>;

export const entityAdapter = createEntityAdapter<BaseEntityPlain & Partial<Entities[keyof Entities]>>();

export function initEntitiesStore(): EntitiesState {
  const result: Partial<EntitiesState> = {};

  entityNames.forEach((entityName) => {
    result[entityName] = entityAdapter.getInitialState();
  });

  return result as EntitiesState;
}
