import { Menu } from "antd";
import { authenticatedRoutes } from "./routes";
import { useLocation, useNavigate } from "react-router-dom";

const ApplicationMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sideBarRoutes = Object.values(authenticatedRoutes).filter(
    (path) => path.sideBarTab
  );

  const currentRoute = sideBarRoutes.find((route) => {
    return location.pathname.includes(route.path);
  });

  const menuRoutes = sideBarRoutes.map((x) => ({
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
      selectedKeys={currentRoute ? [currentRoute.key] : []}
    />
  );
};

export default ApplicationMenu;
