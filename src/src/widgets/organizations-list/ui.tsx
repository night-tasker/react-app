import { Avatar, List } from "antd";
import { RoutePaths } from "app/routing/route-paths";
import RouteService from "app/routing/route-service";
import { Link } from "react-router-dom";
import { Organization } from "shared/api/typicode/models/organization";

interface Props {
  organizations: Organization[];
}
const OrganizationsList = ({ organizations }: Props) => {
  return (
    <List
      // pagination={{}}
      dataSource={organizations}
      renderItem={(item: Organization, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
              />
            }
            title={
              <Link
                to={RouteService.buildRoute(
                  RoutePaths.Authenticated.Organization,
                  { organizationId: item.id }
                )}
              >
                {item.name}
              </Link>
            }
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
};

export default OrganizationsList;
