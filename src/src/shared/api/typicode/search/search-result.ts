export type SearchResult<T> = {
  totalCount: number;
  take: number;
  page: number;
  items: T[];
};
