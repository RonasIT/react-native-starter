import { createActionCreator, Action } from 'deox';

type ActionCreator = (() => Action<string>) & {
  type: string;
  toString(): string;
};

type ActionWithPayloadCreator<T> = ((payload: T) => Action<string, T>) & {
  type: string;
  payload: T;
  toString(): string;
};

export function action(type: string): ActionCreator {
  return createActionCreator(type);
}

export function actionWithPayload<T extends object>(type: string): ActionWithPayloadCreator<T> {
  return createActionCreator(type, (resolve) => (payload: T) => resolve(payload)) as any;
}
