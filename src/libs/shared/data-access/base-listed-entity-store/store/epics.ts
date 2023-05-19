import { isAnyOf } from '@reduxjs/toolkit';
import { of } from 'rxjs';
import { catchError, debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { Entity } from '@libs/shared/data-access/base-entity/config';
import { EntityService } from '@libs/shared/data-access/base-entity/service';
import { Epics } from '@libs/shared/data-access/store/types';
import { BaseListedEntityActions } from './actions';
import { BaseListedEntitySelectors } from './selectors';
import { BaseListedEntityState } from './state';

export const baseListedEntityEpics: <
  TEntity extends Entity = Entity,
  TState extends BaseListedEntityState = BaseListedEntityState
>(
  actions: BaseListedEntityActions,
  selectors: BaseListedEntitySelectors<TEntity, TState>,
  entityService: EntityService<TEntity>
) => Epics = (actions, selectors, entityService) => ({
  loadItems: (action$, state$) => action$.pipe(
    filter(isAnyOf(actions.loadItems, actions.refreshItems)),
    switchMap((action) => entityService
      .search({
        ...(selectors.filters(state$.value) || {}),
        ...('payload' in action ? action.payload : {})
      })
      .pipe(
        map((response) => actions.loadItemsSuccess(response)),
        catchError((error) => of(actions.loadItemsFailure(error)))
      ))
  ),

  changeFilter: (action$) => action$.pipe(
    filter(isAnyOf(actions.changeFilter, actions.resetFilter)),
    map(() => actions.loadItems({ page: 1 }))
  ),

  changeSearchQuery: (action$) => action$.pipe(
    filter(actions.changeSearchQuery.match),
    debounceTime(400),
    map(({ payload }) => actions.changeFilter(payload))
  )
});
