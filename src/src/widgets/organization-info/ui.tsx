import { Card, Typography } from "antd";
import useOrganizationUserRole from "entities/organization/model/organization-user-role";
import { useState } from "react";
import { OrganizationUserRoleConstants } from "shared/api/constants/organization-user-role";
import { Organization } from "shared/api/typicode/models/organization";
import { styled } from "styled-components";
import { OrganizationUserActionKey } from "./types/organization-user-action-key";
import OrganizationService from "shared/services/organization-service";
import { AlertMessageService } from "shared/services/alert-message-service";
import getAdminUserInfoActions from "./lib/get-admin-actions";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "app/routing/route-paths";
import moment from "moment";

interface Props {
  organization: Organization;
  fetchOrganization: () => void;
}
const OrganizationInfo = ({ organization, fetchOrganization }: Props) => {
  const [{ data: organizationUserRole }] = useOrganizationUserRole();
  const [openActionKeyModal, setOpenActionKeyModal] =
    useState<OrganizationUserActionKey | null>(null);
  const navigate = useNavigate();

  const onSaveEditOrganization = (values: Organization) => {
    return OrganizationService.updateOrganization(organization.id, values)
      .then(() => {
        setOpenActionKeyModal(null);
        fetchOrganization();
      })
      .catch(() =>
        AlertMessageService.showErrorMessage(
          "Ошибка при редактировании организации"
        )
      );
  };

  const onDelete = (organizationId: string) => {
    OrganizationService.removeOrganization(organizationId)
      .then(() => {
        AlertMessageService.showSuccessMessage("Организация успешно удалёна");
        navigate(RoutePaths.Authenticated.Organizations);
      })
      .catch(() =>
        AlertMessageService.showErrorMessage("Ошибка при удалении организации")
      );
  };

  const getAvailableActions = () => {
    if (organizationUserRole === OrganizationUserRoleConstants.Admin) {
      return getAdminUserInfoActions(
        organization,
        openActionKeyModal,
        onSaveEditOrganization,
        onDelete
      );
    }
    return [];
  };

  return (
    <OrganizationInfoWrapper>
      <OrganizationCardWrapper>
        <StyledCard actions={getAvailableActions()} title={organization?.name}>
          <OrganizationCardFieldWrapper>
            <Typography.Text>Описание: </Typography.Text>
            <Typography.Text strong>
              {organization?.description}
            </Typography.Text>
          </OrganizationCardFieldWrapper>
          <OrganizationCardFieldWrapper>
            <Typography.Text>Количество пользователей: </Typography.Text>
            <Typography.Text strong>{organization?.usersCount}</Typography.Text>
          </OrganizationCardFieldWrapper>
          <OrganizationCardFieldWrapper>
            <Typography.Text>Дата создания: </Typography.Text>
            <Typography.Text strong>
              {moment(organization?.createdAt).format("DD.MM.YYYY")}
            </Typography.Text>
          </OrganizationCardFieldWrapper>
        </StyledCard>
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

const StyledCard = styled(Card)`
  width: 100%;
`;

const OrganizationCardFieldWrapper = styled.div``;

export default OrganizationInfo;
