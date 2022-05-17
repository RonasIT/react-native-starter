import { createBaseEntityAPI } from '@shared/base-entity/api';
import { User } from '@shared/user/models';

export const userAPI = createBaseEntityAPI<User>('/users', 'user');
