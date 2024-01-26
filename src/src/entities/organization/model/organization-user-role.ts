import {
  Effect,
  createEffect,
  createEvent,
  createStore,
  forward,
} from "effector";
import { useStore } from "effector-react";
import { OrganizationUserRole } from "shared/api/typicode/models/organization";
import { AlertMessageService } from "shared/services/alert-message-service";
import OrganizationService from "shared/services/organization-service";

const getOrganizationUserRoleFx = createEffect(
  async (organizationId: string): Promise<OrganizationUserRole | null> => {
    try {
      setOrganizationUserRoleLoading(true);
      const organizationsRequest =
        await OrganizationService.getOrganizationUserRole(organizationId);
      setOrganizationUserRoleLoading(false);
      return organizationsRequest.data.role;
    } catch {
      AlertMessageService.showErrorMessage("Ошибка загрузки организации");

      setOrganizationUserRoleLoading(false);
      return null;
    }
  }
);

const $organizationUserRoleLoading = createStore<boolean>(false);
const setOrganizationUserRoleLoading = createEvent<boolean>();

forward({
  from: setOrganizationUserRoleLoading,
  to: $organizationUserRoleLoading,
});

const $organizationUserRole = createStore<OrganizationUserRole | null>(null).on(
  getOrganizationUserRoleFx.doneData,
  (_, payload) => {
    return payload;
  }
);

const useOrganizationUserRole = (): [
  { data: OrganizationUserRole | null; loading: boolean },
  Effect<string, OrganizationUserRole | null, Error>
] => {
  return [
    {
      data: useStore($organizationUserRole),
      loading: useStore($organizationUserRoleLoading),
    },
    getOrganizationUserRoleFx,
  ];
};

export default useOrganizationUserRole;
