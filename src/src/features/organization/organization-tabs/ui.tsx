import { Tabs } from "antd";
import getOrganizationTabs from "features/organization/organization-tabs/libs/organization-tabs";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Organization } from "shared/api/typicode/models/organization";

interface Props {
  organization: Organization;
  fetchOrganization: () => void;
}
const OrganizationTabs = ({ organization, fetchOrganization }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onSelectTab = (key: string) => {
    setSearchParams({ tab: key });
  };

  useEffect(() => {
    if (searchParams.get("tab") === null) {
      setSearchParams({ tab: "info" });
    }
  }, [searchParams, setSearchParams]);
  return (
    <Tabs
      type="card"
      items={getOrganizationTabs(organization!, fetchOrganization)}
      activeKey={searchParams.get("tab") ?? "info"}
      onChange={(tabKey) => onSelectTab(tabKey)}
    />
  );
};

export default OrganizationTabs;
