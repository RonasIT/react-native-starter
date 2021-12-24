import { Exclude, Type } from 'class-transformer';
import { Pagination } from '@shared/pagination/models/pagination';

export class PaginationResponse<TEntity extends object = object> extends Pagination {
  @Type((options) => {
    return (options.newObject as PaginationResponse<TEntity>).type;
  })
  public data: Array<TEntity>;

  @Exclude()
  private type: Function;

  constructor(type: Function) {
    super();
    this.type = type;
  }
}
