import { BaseEntity, BaseEntityPlain } from '../models';

export type EntityMap<TEntity extends BaseEntity | BaseEntityPlain = BaseEntity> = Record<TEntity['id'], TEntity>;
