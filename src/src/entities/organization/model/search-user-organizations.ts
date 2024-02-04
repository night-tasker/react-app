import {
  Effect,
  createEffect,
  createEvent,
  createStore,
  forward,
} from "effector";
import { useStore } from "effector-react";
import { Organization } from "shared/api/typicode/models/organization";
import { SearchCriteria } from "shared/api/typicode/search/search-criteria";
import { SearchResult } from "shared/api/typicode/search/search-result";
import { AlertMessageService } from "shared/services/alert-message-service";
import OrganizationService from "shared/services/organization-service";

const searchOrganizationsFx = createEffect(
  async (
    searchCriteria: SearchCriteria
  ): Promise<SearchResult<Organization> | null> => {
    try {
      setLoading(true);
      const organizationsRequest =
        await OrganizationService.searchOrganizations(searchCriteria);
      setLoading(false);
      return organizationsRequest.data;
    } catch {
      AlertMessageService.showErrorMessage("Ошибка загрузки организаций");

      setLoading(false);
      return null;
    }
  }
);

const $loading = createStore<boolean>(false);
const setLoading = createEvent<boolean>();

forward({
  from: setLoading,
  to: $loading,
});

const $organizations = createStore<SearchResult<Organization> | null>(null).on(
  searchOrganizationsFx.doneData,
  (_, payload) => {
    return payload;
  }
);

const useSearchOrganizations = (): [
  { data: SearchResult<Organization> | null; loading: boolean },
  Effect<SearchCriteria, SearchResult<Organization> | null, Error>
] => {
  return [
    {
      data: useStore($organizations),
      loading: useStore($loading),
    },
    searchOrganizationsFx,
  ];
};

export default useSearchOrganizations;
