import { actionWithPayload } from '@store/action-factory';
import { EntityName } from '../config';
import { BaseEntityPlain } from '../models';
import { EntityPartial } from '../types';

export class EntityStoreActions<TEntity extends BaseEntityPlain = BaseEntityPlain & Record<string, any>> {
  public created = actionWithPayload<{ item: TEntity }>(
    `[@entities/${this.entityName}] Created`
  );

  public loaded = actionWithPayload<{ items: Array<TEntity> }>(
    `[@entities/${this.entityName}] Loaded`
  );

  public updated = actionWithPayload<{ item: EntityPartial<TEntity> }>(
    `[@entities/${this.entityName}] Updated`
  );

  public deleted = actionWithPayload<{ item: EntityPartial<TEntity> }>(
    `[@entities/${this.entityName}] Deleted`
  );

  constructor(
protected entityName?: EntityName
  ) {}
}
