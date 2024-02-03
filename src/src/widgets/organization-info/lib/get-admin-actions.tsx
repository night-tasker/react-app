import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import OrganizationModalForm from "widgets/organization-modal-form/ui";
import { OrganizationUserActionKeyEnum } from "../types/organization-user-action-key";
import { Organization } from "shared/api/typicode/models/organization";

const getAdminUserInfoActions = (
  organization: Organization,
  openActionKeyModal: OrganizationUserActionKeyEnum | null,
  onSaveEditOrganization: (values: Organization) => Promise<void>
) => {
  return [
    <SettingOutlined key="setting" />,
    <OrganizationModalForm
      isOpen={openActionKeyModal === OrganizationUserActionKeyEnum.Edit}
      values={organization}
      openButtonInner={<EditOutlined key="edit" />}
      openButtonStyles={{
        border: "none",
        boxShadow: "none",
        paddingTop: 0,
        height: "100%",
      }}
      onSave={onSaveEditOrganization}
    />,
    <EllipsisOutlined key="other" />,
  ];
};

export default getAdminUserInfoActions;
