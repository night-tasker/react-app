import { Button, Skeleton, Typography } from "antd";
import useOrganization from "entities/organization/model/user-organization";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import useOrganizationUserRole from "entities/organization/model/organization-user-role";
import OrganizationTabs from "features/organization/organization-tabs/ui";
import { RoutePaths } from "app/routing/route-paths";

const OrganizationPage = () => {
  const { organizationId } = useParams<{ organizationId: string }>();
  const navigate = useNavigate();
  const [
    { data: organization, loading: organizationLoading },
    fetchOrganization,
  ] = useOrganization();
  const [, fetchOrganizationUserRole] = useOrganizationUserRole();

  useEffect(() => {
    organizationId && fetchOrganization(organizationId);
  }, [organizationId, fetchOrganization]);

  useEffect(() => {
    organizationId && fetchOrganizationUserRole(organizationId);
  }, [organizationId, fetchOrganizationUserRole]);

  return (
    <OrganizationPageWrapper>
      <Skeleton
        loading={organizationLoading || organization === null}
        active={organization === null}
      >
        <OrganizationHeaderWrapper>
          <Typography.Title level={3}>
            Организация <b>{organization?.name}</b>
          </Typography.Title>
        </OrganizationHeaderWrapper>

        <Button
          type="link"
          onClick={() => navigate(RoutePaths.Authenticated.Organizations)}
        >
          К списку организаций
        </Button>

        <OrganizationTabs
          organization={organization!}
          fetchOrganization={() =>
            organizationId && fetchOrganization(organizationId)
          }
        />
      </Skeleton>
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
