import { Skeleton, Spin, Tabs, Typography } from "antd";
import useOrganization from "entities/organization/model/user-organization";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { styled } from "styled-components";
import getOrganizationTabs from "./libs/organization-tabs";
import useOrganizationUserRole from "entities/organization/model/organization-user-role";

const OrganizationPage = () => {
  const { organizationId } = useParams<{ organizationId: string }>();
  const [
    { data: organization, loading: organizationLoading },
    fetchOrganization,
  ] = useOrganization();
  const [_, fetchOrganizationUserRole] = useOrganizationUserRole();
  const [searchParams, setSearchParams] = useSearchParams();

  const onSelectTab = (key: string) => {
    setSearchParams({ tab: key });
  };

  useEffect(() => {
    organizationId && fetchOrganization(organizationId);
  }, [organizationId, fetchOrganization]);

  useEffect(() => {
    organizationId && fetchOrganizationUserRole(organizationId);
  }, [organizationId, fetchOrganizationUserRole]);

  useEffect(() => {
    if (searchParams.get("tab") === null) {
      setSearchParams({ tab: "info" });
    }
  }, [searchParams, setSearchParams]);

  return (
    <OrganizationPageWrapper>
      <>
        <Skeleton loading={organizationLoading} active={organization === null}>
          <OrganizationHeaderWrapper>
            <Typography.Title level={3}>
              Организация <b>{organization?.name}</b>
            </Typography.Title>
          </OrganizationHeaderWrapper>

          <Tabs
            type="card"
            items={getOrganizationTabs(organization!)}
            activeKey={searchParams.get("tab") ?? "info"}
            onChange={(tabKey) => onSelectTab(tabKey)}
          />
        </Skeleton>
      </>
    </OrganizationPageWrapper>
  );
};

const OrganizationPageWrapper = styled.div``;

const OrganizationHeaderWrapper = styled.div`
  text-align: center;
  h3 {
    margin-top: 0;
  }
`;

export default OrganizationPage;
