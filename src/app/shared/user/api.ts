import { createBaseEntityAPI } from '@shared/base-entity/api';
import { User } from '@shared/user/models';
import { Pagination, PaginationResponse } from '@shared/pagination';
import { plainToInstance } from 'class-transformer';

export const userAPI = createBaseEntityAPI<User>('/users', 'user').enhanceEndpoints({
  endpoints: {
    search: {
      transformResponse: (response) => {
        const { data, ...restResponse } = plainToInstance(PaginationResponse, response);
        const instancesData = data.map((item) => plainToInstance(User, item));
        const demoPaginationData = (restResponse as any).meta.pagination;
        const pagination = new Pagination({
          currentPage: demoPaginationData.page,
          total: demoPaginationData.total,
          perPage: demoPaginationData.limit,
          lastPage: demoPaginationData.pages
        });

        return { data: instancesData, ...pagination };
      }
    }
  }
});
