import { keys } from 'lodash';
import { EntitiesState, ENTITIES_CONFIG, EntityName } from '../config';

export const entityNames = keys(ENTITIES_CONFIG) as Array<EntityName>;

export function initEntitiesStore(): EntitiesState {
  const result: Partial<EntitiesState> = {};

  entityNames.forEach((entityName) => {
    result[entityName] = {};
  });

  return result as EntitiesState;
}
