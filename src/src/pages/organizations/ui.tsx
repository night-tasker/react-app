import { Spin, Typography } from "antd";
import useSearchOrganizations from "entities/organization/model/search-user-organizations";
import useOrganizations from "entities/organization/model/user-organizations";
import { useEffect } from "react";
import useSearchCriteria from "shared/api/models/search-criteria";
import { Organization } from "shared/api/typicode/models/organization";
import { SortDirection } from "shared/api/typicode/search/sort-direction";
import { AlertMessageService } from "shared/services/alert-message-service";
import OrganizationService from "shared/services/organization-service";
import { styled } from "styled-components";
import OrganizationModalForm from "widgets/organization-modal-form/ui";
import OrganizationsList from "widgets/organizations-list/ui";

const OrganizationsPage = () => {
  const [
    { data: organizations, loading: organizationsLoading },
    fetchOrganizations,
  ] = useSearchOrganizations();

  const [
    searchCriteria,
    {
      updateFilter: updateSearchFilter,
      updatePaging: updateSearchPaging,
      updateSorter: updateSearchSorter,
    },
  ] = useSearchCriteria();

  const onChangeSearchPaging = (page: number, pageSize: number) => {
    updateSearchPaging({ page, take: pageSize });
  };

  const onChangeSearchFilter = (fields: Record<string, string>) => {
    updateSearchFilter(fields);
  };

  const onChangeSearchSorter = (fields: Record<string, SortDirection>) => {
    updateSearchSorter({ sortFields: fields });
  };

  const onCreateOrganization = () => {
    fetchOrganizations(searchCriteria);
  };

  useEffect(() => {
    fetchOrganizations(searchCriteria);
  }, [fetchOrganizations, searchCriteria]);

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
          <OrganizationsList
            searchResult={organizations}
            searchCriteria={searchCriteria}
            updateSearchPaging={onChangeSearchPaging}
            updateSearchFilter={onChangeSearchFilter}
            updateSearchSorter={onChangeSearchSorter}
          />
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
