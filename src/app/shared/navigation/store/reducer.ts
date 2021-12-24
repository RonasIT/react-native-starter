import { createReducer } from 'deox';
import { AppNavigationActions } from './actions';
import { AppNavigationState } from './state';

const initialState = new AppNavigationState();

export const appNavigationReducer = createReducer(initialState, (handleAction) => [
  handleAction(AppNavigationActions.saveInterruptedNavigation, (state, { payload }) => ({
    ...state,
    interruptedNavigation: state.interruptedNavigation || payload.navigationState
  })),
  handleAction(AppNavigationActions.clearInterruptedNavigation, (state) => ({
    ...state,
    interruptedNavigation: null
  }))
]);
