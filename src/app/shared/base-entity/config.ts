import { User } from '@shared/user/models/user';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { isFunction, keys } from 'lodash';
import { BaseEntityPlain } from './models';
import { EntityMap } from './types';

export type Entities = {
  user: User;
};
export type EntityName = keyof Entities;
export type Entity = Entities[EntityName];
export type EntitiesState = { [key in EntityName]: EntityMap<BaseEntityPlain & Partial<Entities[key]>> };

export const ENTITIES_CONFIG: { [key in EntityName]: ClassConstructor<Entities[key]> } = {
  user: User
};

export const createEntityInstance = <TEntity extends Entity = Entity, TPlain extends object = object>(
  entityName: EntityName,
  data: TPlain | Entity
): TEntity => {
  if (!isFunction(ENTITIES_CONFIG[entityName])) {
    throw new Error(
      `Trying to create unknown entity "${entityName}". Expected one of: ${keys(ENTITIES_CONFIG).join(', ')} `
    );
  }

  if (data instanceof ENTITIES_CONFIG[entityName]) {
    return new ENTITIES_CONFIG[entityName](data) as TEntity;
  }

  return plainToInstance(ENTITIES_CONFIG[entityName] as ClassConstructor<TEntity>, data);
};
