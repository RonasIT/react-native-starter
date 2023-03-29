import { ClassConstructor, instanceToPlain, plainToInstance } from 'class-transformer';
import { isUndefined, omitBy } from 'lodash';
import { apiPromiseService, ApiPromiseService } from '@shared/api/promise-service';
import { PaginationRequest, PaginationResponse } from '@shared/pagination';
import { createEntityInstance, Entity, EntityName } from './config';
import { BaseEntityPlain, EntityRequest } from './models';
import { EntityStoreActions } from './store/actions';
import { EntityPartial } from './types';

export abstract class EntityPromiseService<
  TEntity extends Entity = Entity,
  TSearchRequest extends Record<string, any> = PaginationRequest,
  TEntityRequest extends EntityRequest = EntityRequest
> {
  protected actions: EntityStoreActions;
  protected endpoint: string;
  protected entityName: EntityName;
  protected entitySearchRequestConstructor: ClassConstructor<TSearchRequest>;
  protected entityGetRequestConstructor: ClassConstructor<TEntityRequest>;
  protected apiService: ApiPromiseService;

  constructor(options: {
    endpoint: string;
    entityName: EntityName;
    entitySearchRequestConstructor?: ClassConstructor<TSearchRequest>;
    entityGetRequestConstructor?: ClassConstructor<EntityRequest>;
    apiService?: ApiPromiseService;
  }) {
    this.apiService = options.apiService || apiPromiseService;
    this.endpoint = options.endpoint;
    this.entityName = options.entityName;
    this.entitySearchRequestConstructor =
      options.entitySearchRequestConstructor || (PaginationRequest as ClassConstructor<any>);
    this.entityGetRequestConstructor = options.entityGetRequestConstructor || (EntityRequest as ClassConstructor<any>);
    this.actions = new EntityStoreActions(options.entityName);
  }

  public async create(params: TEntity): Promise<TEntity> {
    const request = createEntityInstance(this.entityName, params, { fromInstancePartial: true });
    const response = await this.apiService.post<BaseEntityPlain>(this.endpoint, instanceToPlain(request));

    return createEntityInstance<TEntity>(this.entityName, response);
  }

  public async search(params: TSearchRequest): Promise<PaginationResponse<TEntity>> {
    const request = new this.entitySearchRequestConstructor(omitBy<TSearchRequest>(params, isUndefined));
    const response = await this.apiService.get<PaginationResponse<BaseEntityPlain>>(
      this.endpoint,
      instanceToPlain<TSearchRequest>(request)
    );
    const { data, ...pagination } = plainToInstance(PaginationResponse, response);

    return {
      ...pagination,
      data: data.map((item) => createEntityInstance<TEntity>(this.entityName, item))
    } as PaginationResponse<TEntity>;
  }

  public async get(id: TEntity['id'], params?: TEntityRequest): Promise<TEntity> {
    const request = new this.entityGetRequestConstructor(omitBy<TEntityRequest>(params, isUndefined));
    const response = await this.apiService.get<BaseEntityPlain>(
      `${this.endpoint}/${id}`,
      instanceToPlain<TEntityRequest>(request)
    );

    return createEntityInstance<TEntity>(this.entityName, response);
  }

  public async update(params: EntityPartial<TEntity>): Promise<EntityPartial<TEntity>> {
    const updatedEntity = createEntityInstance(this.entityName, params, { fromInstancePartial: true }) as TEntity;
    const request: BaseEntityPlain = instanceToPlain(updatedEntity) as BaseEntityPlain;
    const response = await this.apiService.put<void | BaseEntityPlain>(`${this.endpoint}/${request.id}`, request);

    return response ? createEntityInstance<TEntity>(this.entityName, response) : updatedEntity;
  }

  public async delete(id: number): Promise<void> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }

  protected notImplementedMethod(methodName: keyof EntityPromiseService<TEntity>): () => never {
    return () => {
      throw new Error(`Cannot call "${methodName}" for entity "${this.entityName}" - API method is not implemented.`);
    };
  }
}
