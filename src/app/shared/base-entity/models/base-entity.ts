import { Exclude, Expose, Type } from 'class-transformer';
import { immerable } from 'immer';
import { DateTime } from 'luxon';
import { TransformDate } from '@shared/class-transformer';

export abstract class BaseEntity<TID = string | number> {
  public [immerable] = true;

  @Expose()
  public id: TID;

  @Expose({ name: 'created_at' })
  @Type(() => DateTime)
  @TransformDate()
  public createdAt: DateTime;

  @Expose({ name: 'updated_at' })
  @Type(() => DateTime)
  @TransformDate()
  public updatedAt: DateTime;

  @Expose({ name: 'deleted_at' })
  @Type(() => DateTime)
  @TransformDate()
  public deletedAt: DateTime;

  @Exclude()
  public isDeleting: boolean;

  @Exclude()
  public isUpdating: boolean;

  constructor(model: Partial<BaseEntity> = {}) {
    Object.assign(this, model);
  }
}
