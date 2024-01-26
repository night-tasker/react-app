import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Typography } from "antd";
import useOrganizationUserRole from "entities/organization/model/organization-user-role";
import useOrganization from "entities/organization/model/user-organization";
import { useParams } from "react-router-dom";
import { OrganizationUserRoleConstants } from "shared/api/constants/organization-user-role";
import { Organization } from "shared/api/typicode/models/organization";
import { styled } from "styled-components";

interface Props {
  organization: Organization;
}
const OrganizationInfo = ({ organization }: Props) => {
  const params = useParams<{ organizationId: string }>();

  const [{ data: organizationUserRole }] = useOrganizationUserRole();

  return (
    <OrganizationInfoWrapper>
      <OrganizationCardWrapper>
        <Card
          style={{ width: "100%" }}
          actions={
            organizationUserRole === OrganizationUserRoleConstants.Admin
              ? [
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]
              : []
          }
          title={organization?.name}
        >
          <div>
            <Typography.Text>Описание:</Typography.Text>
          </div>
          <Typography.Text strong>{organization?.description}</Typography.Text>
        </Card>
      </OrganizationCardWrapper>
    </OrganizationInfoWrapper>
  );
};

const OrganizationInfoWrapper = styled.div`
  width: 100%;
`;

const OrganizationCardWrapper = styled.div`
  margin: auto;
  width: 100%;
`;

export default OrganizationInfo;
