import { EntityService } from '@shared/base-entity/service';
import { Pagination, PaginationResponse } from '@shared/pagination';
import { map, Observable } from 'rxjs';
import { User } from './models';

class UserService extends EntityService<User> {
  public create = this.notImplementedMethod('create');
  public update = this.notImplementedMethod('update');
  public delete = this.notImplementedMethod('update');

  constructor() {
    super({
      endpoint: '/users',
      entityName: 'user'
    });
  }

  // TODO: Demo method override. Remove in a real app.
  public search(params: { page?: number }): Observable<PaginationResponse<User>> {
    return super.search(params).pipe(
      map((response) => {
        const { data, ...restResponse } = response;
        const demoPaginationData = (restResponse as any).meta.pagination;
        const pagination = new Pagination({
          currentPage: demoPaginationData.page,
          total: demoPaginationData.total,
          perPage: demoPaginationData.limit,
          lastPage: demoPaginationData.pages
        });

        return { data, ...pagination };
      })
    );
  }
}

export const userService = new UserService();
