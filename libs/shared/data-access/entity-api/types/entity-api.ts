import { coreModuleName } from '@reduxjs/toolkit/dist/query/core/module';
import { reactHooksModuleName } from '@reduxjs/toolkit/dist/query/react/module';
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
};

export type EntityApi<
  TEntity extends BaseEntity,
  TSearchRequest extends object = PaginationRequest,
  TEntityRequest extends object = EntityRequest,
  TEndpointDefinitions extends Partial<
    EntityEndpointsDefinitions<TEntity, TSearchRequest, TEntityRequest>
  > = EntityEndpointsDefinitions<TEntity, TSearchRequest, TEntityRequest>
> = Api<BaseQueryFunction, TEndpointDefinitions, string, string, typeof coreModuleName | typeof reactHooksModuleName>;
