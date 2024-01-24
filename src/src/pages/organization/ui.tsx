import { Typography } from "antd";
import useOrganization from "entities/organization/model/user-organization";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

const OrganizationPage = () => {
  const { organizationId } = useParams<{ organizationId: string }>();
  const [{ data: organization }, fetchOrganization] = useOrganization();

  useEffect(() => {
    organizationId && fetchOrganization(organizationId);
  }, [organizationId, fetchOrganization]);

  return (
    <OrganizationPageWrapper>
      <OrganizationHeaderWrapper>
        <Typography.Title level={3}>
          Организация <b>{organization?.name}</b>
        </Typography.Title>
      </OrganizationHeaderWrapper>
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
