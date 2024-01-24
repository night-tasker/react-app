import {
  Effect,
  createEffect,
  createEvent,
  createStore,
  forward,
} from "effector";
import { useStore } from "effector-react";
import { Organization } from "shared/api/typicode/models/organization";
import { AlertMessageService } from "shared/services/alert-message-service";
import OrganizationService from "shared/services/organization-service";

const getOrganizationsFx = createEffect(
  async (): Promise<Organization[] | null> => {
    try {
      setOrganizationsLoading(true);
      const organizationsRequest = await OrganizationService.getOrganizations();
      setOrganizationsLoading(false);
      return organizationsRequest.data;
    } catch {
      AlertMessageService.showErrorMessage("Ошибка загрузки организаций");

      setOrganizationsLoading(false);
      return null;
    }
  }
);

const $organizationsLoading = createStore<boolean>(false);
const setOrganizationsLoading = createEvent<boolean>();

forward({
  from: setOrganizationsLoading,
  to: $organizationsLoading,
});

const $organizations = createStore<Organization[] | null>(null).on(
  getOrganizationsFx.doneData,
  (_, payload) => {
    return payload;
  }
);

const useOrganizations = (): [
  { data: Organization[] | null; loading: boolean },
  Effect<void, Organization[] | null, Error>
] => {
  return [
    {
      data: useStore($organizations),
      loading: useStore($organizationsLoading),
    },
    getOrganizationsFx,
  ];
};

export default useOrganizations;
