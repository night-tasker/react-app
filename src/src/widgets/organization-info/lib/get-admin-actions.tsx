import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import OrganizationModalForm from "widgets/organization-modal-form/ui";
import { OrganizationUserActionKeyEnum } from "../types/organization-user-action-key";
import { Organization } from "shared/api/typicode/models/organization";
import { Button, Dropdown, Typography } from "antd";
import styled from "styled-components";
import { ItemType } from "antd/es/menu/hooks/useItems";

const getAdminUserInfoActions = (
  organization: Organization,
  openActionKeyModal: OrganizationUserActionKeyEnum | null,
  onSaveEditOrganization: (values: Organization) => Promise<void>,
  onDelete: (organizationId: string) => void
) => {
  const otherItems: ItemType[] = [
    {
      key: 1,
      label: <RedText>Удалить</RedText>,
      onClick: () => onDelete(organization.id),
    },
  ];
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
    <Dropdown
      menu={{ items: otherItems }}
      placement="bottom"
      trigger={["click"]}
    >
      <StyledButton>
        <EllipsisOutlined key="other" />
      </StyledButton>
    </Dropdown>,
  ];
};

const StyledButton = styled(Button)`
  border: none;
  box-shadow: none;
  padding-top: 0;
  height: 100%;
`;

const RedText = styled(Typography.Text)`
  color: red;
`;

export default getAdminUserInfoActions;
