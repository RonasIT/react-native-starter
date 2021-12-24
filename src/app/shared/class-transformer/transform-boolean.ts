import { Transform } from 'class-transformer';

export function TransformBoolean(): Function {
  const toPlain = Transform(({ value }) => (typeof value === 'boolean' ? (value === true ? 1 : 0) : value), {
    toPlainOnly: true
  });

  const toClass = Transform(({ value }) => (typeof value === 'string' ? value === '1' : value), { toClassOnly: true });

  return (target: any, key: string): void => {
    toPlain(target, key);
    toClass(target, key);
  };
}
