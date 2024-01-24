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

const getOrganizationFx = createEffect(
  async (organizationId: string): Promise<Organization | null> => {
    try {
      setOrganizationLoading(true);
      const organizationsRequest =
        await OrganizationService.getOrganizationById(organizationId);
      setOrganizationLoading(false);
      return organizationsRequest.data;
    } catch {
      AlertMessageService.showErrorMessage("Ошибка загрузки организации");

      setOrganizationLoading(false);
      return null;
    }
  }
);

const $organizationLoading = createStore<boolean>(false);
const setOrganizationLoading = createEvent<boolean>();

forward({
  from: setOrganizationLoading,
  to: $organizationLoading,
});

const $organization = createStore<Organization | null>(null).on(
  getOrganizationFx.doneData,
  (_, payload) => {
    return payload;
  }
);

const useOrganization = (): [
  { data: Organization | null; loading: boolean },
  Effect<string, Organization | null, Error>
] => {
  return [
    {
      data: useStore($organization),
      loading: useStore($organizationLoading),
    },
    getOrganizationFx,
  ];
};

export default useOrganization;
