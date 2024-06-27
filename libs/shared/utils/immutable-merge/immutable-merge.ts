import produce from 'immer';
import { merge } from 'lodash';

export const immutableMerge = <TInitial, TPatch>(initial: TInitial, patch: TPatch): TInitial => produce(initial, (draft) => merge(draft, patch));
