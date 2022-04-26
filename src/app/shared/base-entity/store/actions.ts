import { createAction } from '@reduxjs/toolkit';
import { EntityName } from '../config';
import { BaseEntityPlain } from '../models';
import { EntityPartial } from '../types';

export class EntityStoreActions<TEntity extends BaseEntityPlain = BaseEntityPlain & Record<string, any>> {
  public created = createAction<{ item: TEntity }>(
    `[@entities/${this.entityName}] Created`
  );

  public loaded = createAction<{ items: Array<TEntity> }>(
    `[@entities/${this.entityName}] Loaded`
  );

  public updated = createAction<{ item: EntityPartial<TEntity> }>(
    `[@entities/${this.entityName}] Updated`
  );

  public deleted = createAction<{ item: EntityPartial<TEntity> }>(
    `[@entities/${this.entityName}] Deleted`
  );

  constructor(
protected entityName?: EntityName
  ) {}
}
