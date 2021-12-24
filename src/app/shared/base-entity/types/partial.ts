import { BaseEntity, BaseEntityPlain } from '../models';

export type EntityPartial<TEntity extends BaseEntity | BaseEntityPlain = BaseEntity> = {
  id: TEntity['id'];
} & Partial<TEntity>;
