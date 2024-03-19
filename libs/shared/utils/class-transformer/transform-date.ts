import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export function TransformDate(format?: string, withTime: boolean = true): (target: any, key: string) => void {
  const toPlain = Transform(
    ({ value }) => {
      if (DateTime.isDateTime(value)) {
        const utcValue = value.toUTC();

        return format ? utcValue.toFormat(format) : withTime ? utcValue.toISO() : utcValue.toISODate();
      }

      return value;
    },
    { toPlainOnly: true },
  );

  const toClass = Transform(
    ({ value }) => value ? (format ? DateTime.fromFormat(value, format).toLocal() : DateTime.fromISO(value).toLocal()) : value,
    {
      toClassOnly: true
    },
  );

  return (target: any, key: string): void => {
    toPlain(target, key);
    toClass(target, key);
  };
}
