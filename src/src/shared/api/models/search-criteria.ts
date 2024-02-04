import { createEvent, createStore, sample, Event } from "effector";
import { SearchCriteria } from "../typicode/search/search-criteria";
import { SearchFilter } from "../typicode/search/search-filter";
import { SearchSorter } from "../typicode/search/search-sorter";
import { useStore } from "effector-react";
import { SearchPaging } from "../typicode/search/search-paging";

const $searchCriteria = createStore<SearchCriteria>({
  paging: { page: 1, take: 10 },
});

const updateFilter = createEvent<SearchFilter>();

sample({
  clock: updateFilter,
  source: $searchCriteria,
  fn: (src, clock) => ({ ...src, filter: clock }),
  target: $searchCriteria,
});

const updateSorter = createEvent<SearchSorter>();

sample({
  clock: updateSorter,
  source: $searchCriteria,
  fn: (src, clock) => ({ ...src, sorter: clock }),
  target: $searchCriteria,
});

const updatePaging = createEvent<SearchPaging>();

sample({
  clock: updatePaging,
  source: $searchCriteria,
  fn: (src, clock) => ({ ...src, paging: clock }),
  target: $searchCriteria,
});

const useSearchCriteria = (): [
  SearchCriteria,
  {
    updateFilter: Event<SearchFilter>;
    updateSorter: Event<SearchSorter>;
    updatePaging: Event<SearchPaging>;
  }
] => {
  return [
    useStore($searchCriteria),
    { updateFilter, updateSorter, updatePaging },
  ];
};

export default useSearchCriteria;
