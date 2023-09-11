import { Expose } from 'class-transformer';
import { TransformRelations } from '@libs/shared/utils/class-transformer';

export class EntityRequest<TRelation extends string = string, TWithCount extends string = string> {
  @TransformRelations()
  @Expose({ name: 'with' })
  public relations?: Array<TRelation>;

  @TransformRelations()
  @Expose({ name: 'with_count' })
  public withCount?: Array<TWithCount>;

  constructor(params?: Partial<EntityRequest<TRelation, TWithCount>>) {
    Object.assign(this, params);
  }
}
