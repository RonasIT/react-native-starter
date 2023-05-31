export class AppEnv<TEnv extends string | number> {
  public get current(): TEnv;

  constructor(private readonly env: TEnv);

  public select<TValue>(options: Record<TEnv, TValue> | Record<'default', TValue>): TValue;
}
