import { Entity } from '@shared/base-entity/config';
import { EntityService } from '@shared/base-entity/service';
import { Epics } from '@store/types';
import { ofType } from 'deox';
import { of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
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
    ofType([actions.loadItems, actions.refreshItems]),
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
    ofType([actions.changeFilter, actions.resetFilter]),
    map(() => actions.loadItems({ page: 1 }))
  ),

  changeSearchQuery: (action$) => action$.pipe(
    ofType(actions.changeSearchQuery),
    debounceTime(400),
    map(({ payload }) => actions.changeFilter(payload))
  )
});
