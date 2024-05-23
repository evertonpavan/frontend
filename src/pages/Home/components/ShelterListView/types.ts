import { IUseSheltersData } from '@/hooks/useShelters/types';
import { IFilterFormProps } from '../Filter/types';

export interface IShelterListViewProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSubmit'> {
  count: number;
  data: IUseSheltersData[];
  loading?: boolean;
  searchValue?: string;
  hasMoreItems?: boolean;
  onOpenModal?: () => void;
  onClearSearch?: () => void;
  onSearchValueChange?: (v: string) => void;
  onCitiesChange?: (v: string[]) => void;
  onFetchMoreData?: () => void;
  onSelectShelter?: (shelter: IUseSheltersData) => void;
  filterData: IFilterFormProps;
  onSubmit: (values: IFilterFormProps) => void;
}
