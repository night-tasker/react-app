import { Menu } from "antd";
import { useMemo } from "react";
import { authenticatedRoutes } from "./routes";
import { useNavigate } from "react-router-dom";

const ApplicationMenu = () => {
  const navigate = useNavigate();
  const menuRoutes = Object.keys(authenticatedRoutes)
    .map((x) => authenticatedRoutes[x])
    .filter((x) => x.sideBarTab)
    .map((x) => ({
      ...x,
      onClick: () => {
        navigate(x.path);
      },
    }));

  return <Menu theme="dark" mode="inline" items={menuRoutes} />;
};

export default ApplicationMenu;
