import { apiService, ApiService } from '@shared/api/service';
import { PaginationRequest, PaginationResponse } from '@shared/pagination';
import { storeHandle } from '@store/store-handle';
import { ClassConstructor, instanceToPlain, plainToInstance } from 'class-transformer';
import { isUndefined, omitBy } from 'lodash';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { createEntityInstance, Entity, EntityName } from './config';
import { BaseEntityPlain, EntityRequest } from './models';
import { EntityStoreActions } from './store/actions';
import { EntityPartial } from './types';

export abstract class EntityService<
  TEntity extends Entity = Entity,
  TSearchRequest extends Record<string, any> = PaginationRequest,
  TEntityRequest extends EntityRequest = EntityRequest
> {
  protected actions: EntityStoreActions;
  protected endpoint: string;
  protected entityName: EntityName;
  protected entitySearchRequestConstructor: ClassConstructor<TSearchRequest>;
  protected entityGetRequestConstructor: ClassConstructor<TEntityRequest>;
  protected apiService: ApiService;

  constructor(options: {
    endpoint: string;
    entityName: EntityName;
    entitySearchRequestConstructor?: ClassConstructor<TSearchRequest>;
    entityGetRequestConstructor?: ClassConstructor<EntityRequest>;
    apiService?: ApiService;
  }) {
    this.apiService = options.apiService || apiService;
    this.endpoint = options.endpoint;
    this.entityName = options.entityName;
    this.entitySearchRequestConstructor =
      options.entitySearchRequestConstructor || (PaginationRequest as ClassConstructor<any>);
    this.entityGetRequestConstructor = options.entityGetRequestConstructor || (EntityRequest as ClassConstructor<any>);
    this.actions = new EntityStoreActions(options.entityName);
  }

  public create(params: TEntity): Observable<TEntity> {
    const request = createEntityInstance(this.entityName, params, { fromInstancePartial: true });

    return this.apiService.post<BaseEntityPlain>(this.endpoint, instanceToPlain(request)).pipe(
      tap((response) => storeHandle.dispatch(this.actions.created({ item: response }))),
      map((response) => createEntityInstance<TEntity>(this.entityName, response))
    );
  }

  public search(params: TSearchRequest): Observable<PaginationResponse<TEntity>> {
    const request = new this.entitySearchRequestConstructor(omitBy<TSearchRequest>(params, isUndefined));

    return this.apiService
      .get<PaginationResponse<BaseEntityPlain>>(this.endpoint, instanceToPlain<TSearchRequest>(request))
      .pipe(
        tap((response) => storeHandle.dispatch(this.actions.loaded({ items: response?.data || [] }))),
        map((response) => {
          const { data, ...pagination } = plainToInstance(PaginationResponse, response);

          return {
            ...pagination,
            data: data.map((item) => createEntityInstance<TEntity>(this.entityName, item))
          } as PaginationResponse<TEntity>;
        })
      );
  }

  public get(id: TEntity['id'], params?: TEntityRequest): Observable<TEntity> {
    const request = new this.entityGetRequestConstructor(omitBy<TEntityRequest>(params, isUndefined));

    return this.apiService
      .get<BaseEntityPlain>(`${this.endpoint}/${id}`, instanceToPlain<TEntityRequest>(request))
      .pipe(
        tap((response) => storeHandle.dispatch(this.actions.loaded({ items: [response] }))),
        map((response) => createEntityInstance<TEntity>(this.entityName, response))
      );
  }

  public update(params: EntityPartial<TEntity>): Observable<EntityPartial<TEntity>> {
    const updatedEntity = createEntityInstance(this.entityName, params, { fromInstancePartial: true }) as TEntity;
    const request: BaseEntityPlain = instanceToPlain(updatedEntity) as BaseEntityPlain;

    return apiService.put<void | BaseEntityPlain>(`${this.endpoint}/${request.id}`, request).pipe(
      tap((response) => storeHandle.dispatch(this.actions.updated({ item: response || request }))),
      map((response) => (response ? createEntityInstance<TEntity>(this.entityName, response) : updatedEntity))
    );
  }

  public delete(id: number): Observable<void> {
    return this.apiService
      .delete(`${this.endpoint}/${id}`)
      .pipe(tap(() => storeHandle.dispatch(this.actions.deleted({ item: { id } }))));
  }

  protected notImplementedMethod(methodName: keyof EntityService<TEntity>): () => never {
    return () => {
      throw new Error(`Cannot call "${methodName}" for entity "${this.entityName}" - API method is not implemented.`);
    };
  }
}
