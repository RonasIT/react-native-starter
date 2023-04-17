import { Expose } from 'class-transformer';

export class EntityRequest<TRelation extends string = string, TWithCount extends string = string> {
  @Expose({ name: 'with', toPlainOnly: true })
  public relations?: Array<TRelation>;

  @Expose({ name: 'with_count', toPlainOnly: true })
  public withCount?: Array<TWithCount>;

  constructor(params?: Partial<EntityRequest<TRelation, TWithCount>>) {
    Object.assign(this, params);
  }
}
