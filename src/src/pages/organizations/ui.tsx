import { Spin, Typography } from "antd";
import useOrganizations from "entities/organization/model/user-organizations";
import { useEffect } from "react";
import { Organization } from "shared/api/typicode/models/organization";
import { AlertMessageService } from "shared/services/alert-message-service";
import OrganizationService from "shared/services/organization-service";
import { styled } from "styled-components";
import OrganizationModalForm from "widgets/organization-modal-form/ui";
import OrganizationsList from "widgets/organizations-list/ui";

const OrganizationsPage = () => {
  const [
    { data: organizations, loading: organizationsLoading },
    fetchOrganizations,
  ] = useOrganizations();

  const onCreateOrganization = () => {
    fetchOrganizations();
  };

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  const onSaveOrganization = (organization: Organization) => {
    return OrganizationService.createOrganization(organization)
      .then(() => {
        onCreateOrganization();
      })
      .catch(() => {
        AlertMessageService.showErrorMessage("Ошибка при создании организации");
      });
  };

  return (
    <>
      <OrganizationsTitleWrapper>
        <Typography.Title level={3}>Организации</Typography.Title>
      </OrganizationsTitleWrapper>
      <CreateOrganizationModalWrapper>
        <OrganizationModalForm
          values={{} as Organization}
          openButtonInner={<>Создать организацию</>}
          onSave={onSaveOrganization}
        />
      </CreateOrganizationModalWrapper>
      <ListWrapper>
        <Spin spinning={organizationsLoading}>
          <OrganizationsList organizations={organizations ?? []} />
        </Spin>
      </ListWrapper>
    </>
  );
};

const OrganizationsTitleWrapper = styled.div`
  text-align: center;
  h3 {
    margin-top: 0;
  }
`;

const CreateOrganizationModalWrapper = styled.div`
  text-align: right;
`;

const ListWrapper = styled.div``;

export default OrganizationsPage;
