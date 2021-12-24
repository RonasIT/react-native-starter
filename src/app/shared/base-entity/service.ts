import { apiService } from '@shared/api/service';
import { PaginationRequest, PaginationResponse } from '@shared/pagination';
import { store } from '@store/store';
import { ClassConstructor, classToPlain, plainToClass } from 'class-transformer';
import { isObject, isUndefined, omitBy } from 'lodash';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { createEntityInstance, Entity, EntityName } from './config';
import { BaseEntityPlain, EntityRequest } from './models';
import { EntityStoreActions } from './store';
import { EntityPartial } from './types';

export abstract class EntityService<
  TEntity extends Entity = Entity,
  TPaginationRequest extends PaginationRequest = PaginationRequest,
  TEntityRequest extends EntityRequest = EntityRequest
> {
  protected actions: EntityStoreActions;

  constructor(
    protected endpoint: string,
    protected entityName: EntityName,
    protected entityPaginationRequestConstructor: ClassConstructor<TPaginationRequest> = PaginationRequest as any,
    protected entityRequestConstructor: ClassConstructor<TEntityRequest> = EntityRequest as any
  ) {
    this.actions = new EntityStoreActions(entityName);
  }

  public create(params: TEntity): Observable<TEntity> {
    const request = createEntityInstance(this.entityName, params);

    return apiService.post<BaseEntityPlain>(this.endpoint, classToPlain(request)).pipe(
      tap((response) => store.dispatch(this.actions.created({ item: response }))),
      map((response) => createEntityInstance<TEntity>(this.entityName, response))
    );
  }

  public search(params: TPaginationRequest): Observable<PaginationResponse<TEntity>> {
    const request = new this.entityPaginationRequestConstructor(omitBy<TPaginationRequest>(params, isUndefined));

    return apiService
      .get<PaginationResponse<BaseEntityPlain>>(this.endpoint, classToPlain<TPaginationRequest>(request))
      .pipe(
        tap((response) => store.dispatch(this.actions.loaded({ items: response?.data || [] }))),
        map((response) => {
          const { data, ...pagination } = plainToClass(PaginationResponse, response);

          return {
            ...pagination,
            data: data.map((item) => createEntityInstance<TEntity>(this.entityName, item))
          } as PaginationResponse<TEntity>;
        })
      );
  }

  public get(id: TEntity['id'], params?: TEntityRequest): Observable<TEntity> {
    const request = new this.entityRequestConstructor(omitBy<TEntityRequest>(params, isUndefined));

    return apiService.get<BaseEntityPlain>(`${this.endpoint}/${id}`, classToPlain<TEntityRequest>(request)).pipe(
      tap((response) => store.dispatch(this.actions.loaded({ items: [response] }))),
      map((response) => createEntityInstance<TEntity>(this.entityName, response))
    );
  }

  public update(params: EntityPartial<TEntity>): Observable<EntityPartial<TEntity>> {
    const request: BaseEntityPlain = classToPlain(createEntityInstance(this.entityName, params)) as BaseEntityPlain;

    return apiService.put<void | BaseEntityPlain>(`${this.endpoint}/${request.id}`, request).pipe(
      tap((response) => store.dispatch(this.actions.updated({ item: response || request }))),
      map((response) => createEntityInstance<TEntity>(this.entityName, isObject(response) ? response : request))
    );
  }

  public delete(id: number): Observable<void> {
    return apiService
      .delete(`${this.endpoint}/${id}`)
      .pipe(tap(() => store.dispatch(this.actions.deleted({ item: { id } }))));
  }

  protected notImplementedMethod(methodName: keyof EntityService<TEntity>): () => never {
    return () => {
      throw new Error(`Cannot call "${methodName}" for entity "${this.entityName}" - API method is not implemented.`);
    };
  }
}
