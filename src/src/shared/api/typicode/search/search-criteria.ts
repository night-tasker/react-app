import { SearchFilter } from "./search-filter";
import { SearchPaging } from "./search-paging";
import { SearchSorter } from "./search-sorter";

export type SearchCriteria = {
  filter?: SearchFilter;
  sorter?: SearchSorter;
  paging?: SearchPaging;
};
