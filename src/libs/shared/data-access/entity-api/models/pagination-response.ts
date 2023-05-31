import { Exclude, Expose, Type } from 'class-transformer';
import { Pagination } from './pagination';
import type { ClassConstructor } from 'class-transformer';

export class PaginationResponse<TEntity extends object = object> extends Pagination {
  @Expose({ toClassOnly: true })
  @Type((options) => (options?.newObject as PaginationResponse<TEntity>).type)
  public data: Array<TEntity>;

  @Exclude()
  private type: ClassConstructor<TEntity>;

  constructor(type: ClassConstructor<TEntity>) {
    super();
    this.type = type;
  }
}
