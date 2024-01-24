import { Menu } from "antd";
import { authenticatedRoutes } from "./routes";
import { useLocation, useNavigate } from "react-router-dom";

const ApplicationMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey = Object.keys(authenticatedRoutes).find(
    (x) => authenticatedRoutes[x].path === location.pathname
  )!;

  const menuRoutes = Object.keys(authenticatedRoutes)
    .map((x) => authenticatedRoutes[x])
    .filter((x) => x.sideBarTab)
    .map((x) => ({
      key: x.key,
      label: x.label,
      icon: x.icon,
      path: x.path,

      onClick: () => {
        navigate(x.path);
      },
    }));

  return (
    <Menu
      theme="dark"
      mode="inline"
      items={menuRoutes}
      selectedKeys={[selectedKey]}
    />
  );
};

export default ApplicationMenu;
