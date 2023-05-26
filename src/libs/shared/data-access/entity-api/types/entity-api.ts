import { coreModuleName } from '@reduxjs/toolkit/dist/query/core/module';
import { EndpointBuilder, EndpointDefinitions, ReplaceTagTypes } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { reactHooksModuleName } from '@reduxjs/toolkit/dist/query/react/module';
import { NoInfer } from '@reduxjs/toolkit/dist/tsHelpers';
import { Api, MutationDefinition, QueryDefinition } from '@reduxjs/toolkit/query/react';
import { BaseEntity, EntityRequest, PaginationRequest, PaginationResponse } from '../models';
import { BaseQueryFunction } from '../utils';
import { EntityPartial } from './entity-partial';

export type EntityEndpointsDefinitions<
  TEntity extends BaseEntity,
  TSearchRequest extends object = PaginationRequest,
  TEntityRequest extends object = EntityRequest
> = {
  create: MutationDefinition<Partial<TEntity>, BaseQueryFunction, string, TEntity>;
  search: QueryDefinition<TSearchRequest, BaseQueryFunction, string, PaginationResponse<TEntity>>;
  searchInfinite: QueryDefinition<TSearchRequest, BaseQueryFunction, string, Array<PaginationResponse<TEntity>>>;
  get: QueryDefinition<{ id: TEntity['id']; params?: TEntityRequest }, BaseQueryFunction, string, TEntity>;
  update: MutationDefinition<EntityPartial<TEntity>, BaseQueryFunction, string, EntityPartial<TEntity>>;
  delete: MutationDefinition<number, BaseQueryFunction, string, void>;
  // For internal use only
  entityCache: QueryDefinition<{ id: TEntity['id'] }, BaseQueryFunction, string, TEntity>;
};

export type BaseEntityApi<
  TEntity extends BaseEntity,
  TSearchRequest extends object = PaginationRequest,
  TEntityRequest extends object = EntityRequest,
  TEndpointDefinitions extends Partial<
    EntityEndpointsDefinitions<TEntity, TSearchRequest, TEntityRequest>
  > = EntityEndpointsDefinitions<TEntity, TSearchRequest, TEntityRequest>
> = Omit<
  Api<BaseQueryFunction, TEndpointDefinitions, string, string, typeof coreModuleName | typeof reactHooksModuleName>,
  'injectEndpoints' | 'enhanceEndpoints'
>;

export type EntityApi<
  TEntity extends BaseEntity,
  TSearchRequest extends object = PaginationRequest,
  TEntityRequest extends object = EntityRequest,
  // TODO: Ability to omit endpoints
  TEntityEndpointsDefinitions extends Partial<
    EntityEndpointsDefinitions<TEntity, TSearchRequest, TEntityRequest>
  > = Omit<EntityEndpointsDefinitions<TEntity, TSearchRequest, TEntityRequest>, 'entityCache'>
> = BaseEntityApi<TEntity, TSearchRequest, TEntityRequest, TEntityEndpointsDefinitions> & {
  injectEndpoints<NewDefinitions extends EndpointDefinitions>(_: {
    endpoints: (build: EndpointBuilder<BaseQueryFunction, string, string>) => NewDefinitions;
    overrideExisting?: boolean;
  }): EntityApi<TEntity, TSearchRequest, TEntityRequest, TEntityEndpointsDefinitions & NewDefinitions>;

  enhanceEndpoints<NewTagTypes extends string = never>(_: {
    addTagTypes?: Array<NewTagTypes>;
    endpoints?: ReplaceTagTypes<
      Omit<EntityEndpointsDefinitions<TEntity, TSearchRequest, TEntityRequest>, 'entityCache'>,
      string | NoInfer<NewTagTypes>
    > extends infer NewDefinitions
      ? {
          [K in keyof NewDefinitions]?: Partial<NewDefinitions[K]> | ((definition: NewDefinitions[K]) => void);
        }
      : never;
  }): EntityApi<
    TEntity,
    TSearchRequest,
    TEntityRequest,
    ReplaceTagTypes<EntityEndpointsDefinitions<TEntity, TSearchRequest, TEntityRequest>, string | NewTagTypes>
  >;
};
