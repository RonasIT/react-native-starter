export class AppEnv<TEnv extends string | number> {
  public get current(): TEnv;

  private readonly env: TEnv;

  constructor(env: TEnv);

  public select<TValue>(options: Record<TEnv, TValue> | Record<'default', TValue>): TValue;
}
