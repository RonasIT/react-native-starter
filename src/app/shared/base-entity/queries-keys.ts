import { mergeQueryKeys } from '@lukemorales/query-key-factory';
import { User } from '@shared/user';
import { Entities } from './config';
import { createQueriesKeys } from './utils';

const userKeys = createQueriesKeys<User>('user');

export const queriesKeys = mergeQueryKeys(userKeys) as {
  [EntityName in keyof Entities]: ReturnType<typeof createQueriesKeys>;
};
