import { useSelector } from 'react-redux';
import { Pagination } from '@shared/pagination';
import { HomeScreenSelectors } from './shared/store';

class HomeScreenFacade {
  public get pagination(): Pagination {
    return useSelector(HomeScreenSelectors.pagination);
  }

  public get itemsIDs(): Array<number> {
    return useSelector(HomeScreenSelectors.itemIDs);
  }

  public get hasNextPage(): boolean {
    return useSelector(HomeScreenSelectors.hasNextPage);
  }
}

export const homeScreenFacade = new HomeScreenFacade();
