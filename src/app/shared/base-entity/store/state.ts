import { keys } from 'lodash';
import { ENTITIES_CONFIG, EntitiesState, EntityName } from '../config';
import { entityAdapter } from './adapter';

export const entityNames = keys(ENTITIES_CONFIG) as Array<EntityName>;

export function initEntitiesStore(): EntitiesState {
  const result: Partial<EntitiesState> = {};

  entityNames.forEach((entityName) => {
    result[entityName] = entityAdapter.getInitialState();
  });

  return result as EntitiesState;
}
