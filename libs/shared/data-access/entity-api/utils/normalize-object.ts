import { forOwn, set, sortBy } from 'lodash';
import sortObject from 'sort-object-keys';

export const normalizeObject = <TObject extends object>(object: TObject): TObject => {
  if (typeof object !== 'object') {
    return object;
  }

  if (Array.isArray(object)) {
    return sortBy(object).map((item) => normalizeObject(item)) as TObject;
  } else {
    const result = { ...sortObject(object) };

    forOwn(result, (value, key) => {
      set(result, key, normalizeObject(value as TObject));
    });

    return result;
  }
};
