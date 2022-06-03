import { PaginationResponse } from '@shared/pagination';
import { User } from '@shared/user';
import { defineAction } from '@store/utils';

export class HomeScreenActions {
  public static resetState = defineAction(
    '[Home Screen] Reset State'
  );

  public static loadItemsSuccess = defineAction<PaginationResponse<User>>(
    '[Home Screen] Load items success'
  );
}
