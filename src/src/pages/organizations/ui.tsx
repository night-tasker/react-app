import { Spin, Typography } from "antd";
import useOrganizations from "entities/organization/model/user-organizations";
import { useEffect } from "react";
import { Organization } from "shared/api/typicode/models/organization";
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

  return (
    <>
      <OrganizationsTitleWrapper>
        <Typography.Title level={3}>Организации</Typography.Title>
      </OrganizationsTitleWrapper>
      <CreateOrganizationModalWrapper>
        <OrganizationModalForm
          onSaving={onCreateOrganization}
          values={{} as Organization}
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
