import { defineAction } from '@store/utils';
import { Entities, EntityName } from '../config';
import { BaseEntityPlain } from '../models';
import { EntityPartial } from '../types';

export class EntityStoreActions<TEntity extends BaseEntityPlain = BaseEntityPlain & Partial<Entities[keyof Entities]>> {
  public created = defineAction<{ item: TEntity }>(
    `[@entities/${this.entityName}] defined`
  );

  public loaded = defineAction<{ items: Array<TEntity> }>(
    `[@entities/${this.entityName}] Loaded`
  );

  public updated = defineAction<{ item: EntityPartial<TEntity> }>(
    `[@entities/${this.entityName}] Updated`
  );

  public deleted = defineAction<{ item: EntityPartial<TEntity> }>(
    `[@entities/${this.entityName}] Deleted`
  );

  constructor(
protected entityName?: EntityName
  ) {}
}
