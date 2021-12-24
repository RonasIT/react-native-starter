export abstract class BaseEntityPlain<TID = string | number> {
  public id: TID;
  public created_at: string;
  public updated_at: string;
  public deleted_at: string;

  constructor(model: Partial<BaseEntityPlain<TID>> = {}) {
    Object.assign(this, model);
  }
}
