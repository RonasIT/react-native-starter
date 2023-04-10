import { EntityRequest } from '@shared/base-entity/models';
import { EntityPromiseService } from '@shared/base-entity/promise-service';
import { Pagination, PaginationResponse } from '@shared/pagination';
import { User } from './models';

// TODO: Demo class. Remove in real app
class UserResponse {
  public meta: any;
  public data: User;

  constructor(model: Partial<Response>) {
    Object.assign(this, model);
  }
}

class UserPromiseService extends EntityPromiseService<User> {
  constructor() {
    super({
      endpoint: '/users',
      entityName: 'user'
    });
  }

  // TODO: Demo method override. Remove in a real app.
  public async search(params: { page?: number }): Promise<PaginationResponse<User>> {
    const response = await super.search(params);
    const { data, ...restResponse } = response;
    const demoPaginationData = (restResponse as any).meta.pagination;
    const pagination = new Pagination({
      currentPage: demoPaginationData.page,
      total: demoPaginationData.total,
      perPage: demoPaginationData.limit,
      lastPage: demoPaginationData.pages
    });

    return { data, ...pagination };
  }

  public async get(id: number, params?: EntityRequest): Promise<User> {
    const response = await super.get(id, params);

    return (response as any as UserResponse).data;
  }

  public async create(params: User): Promise<User> {
    const response = await super.create(params);

    return (response as any as UserResponse).data;
  }
}

export const userPromiseService = new UserPromiseService();
