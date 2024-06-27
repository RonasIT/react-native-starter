import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit';

export function defineAction<T extends object | void = void>(
  type: string,
): T extends object ? ActionCreatorWithPayload<T> : ActionCreatorWithoutPayload {
  return createAction(type) as any;
}
