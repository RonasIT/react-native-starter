import { ClassConstructor, Exclude, Type } from 'class-transformer';
import { Pagination } from './pagination';

export class PaginationResponse<TEntity extends object = object> extends Pagination {
  @Type((options) => {
    return (options.newObject as PaginationResponse<TEntity>).type;
  })
  public data: Array<TEntity>;

  @Exclude()
  private type?: ClassConstructor<TEntity>;

  constructor(type: ClassConstructor<TEntity>) {
    super();
    this.type = type;
  }
}
