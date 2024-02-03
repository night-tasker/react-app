import { InfoOutlined, UserOutlined } from "@ant-design/icons";
import OrganizationInfo from "widgets/organization-info/ui";
import { Tab } from "shared/api/typicode/tab";
import { Organization } from "shared/api/typicode/models/organization";

const getOrganizationTabs = (
  organization: Organization,
  fetchOrganization: () => void
): Tab[] => {
  return [
    {
      id: "info",
      label: "Информация о компании",
      icon: <InfoOutlined />,
      key: "info",
      children: (
        <OrganizationInfo
          organization={organization}
          fetchOrganization={fetchOrganization}
        />
      ),
    },
    {
      id: "users",
      label: "Пользователи",
      icon: <UserOutlined />,
      key: "users",
    },
  ];
};

export default getOrganizationTabs;
