import { SortDirection } from "./sort-direction";

export type SearchSorter = {
  sortFields: Record<string, SortDirection>;
};
