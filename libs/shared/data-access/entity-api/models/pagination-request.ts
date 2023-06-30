import { TransformBoolean } from '@libs/shared/utils/class-transformer';
import { Expose } from 'class-transformer';

export class PaginationRequest<
  TRelation extends string = string,
  TOrderBy extends string = string,
  TWithCount extends string = string
> {
  @Expose()
  public query?: string;

  @Expose()
  public page?: number;

  @Expose({ name: 'per_page' })
  public perPage?: number;

  @TransformBoolean()
  @Expose()
  public all?: boolean;

  @Expose({ name: 'with' })
  public relations?: Array<TRelation>;

  @Expose({ name: 'with_count' })
  public withCount?: Array<TWithCount>;

  @Expose({ name: 'order_by' })
  public orderBy?: TOrderBy;

  @TransformBoolean()
  @Expose()
  public desc?: boolean;

  constructor(request: Partial<PaginationRequest<TRelation, TOrderBy, TWithCount>>) {
    Object.assign(this, request);
  }
}
