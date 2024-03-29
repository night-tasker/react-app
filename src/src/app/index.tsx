import React, { useEffect, useState } from "react";
import "./index.css";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import styled from "styled-components";
import { Routes, useLocation, useNavigate } from "react-router-dom";
import useCurrentUser from "entities/user/model/current-user";
import { anonymousRoutes, allRoutes } from "./routing/routes";
import { RoutePaths } from "./routing/route-paths";
import RouteService from "./routing/route-service";
import LayoutHeader from "widgets/layout-header";
import { updateToken } from "entities/user/model/token";
import ApplicationMenu from "./routing/application-menu";
import AppLogo from "features/app-logo/ui";

function App() {
  const [fullHeight, setFullHeight] = useState(0);
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  const calculateFullHeight = () => {
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.clientHeight;

    setFullHeight(Math.max(windowHeight, bodyHeight));
  };

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    calculateFullHeight();

    updateToken();

    window.addEventListener("resize", calculateFullHeight);

    return () => {
      window.removeEventListener("resize", calculateFullHeight);
    };
  }, []);

  useEffect(() => {
    if (!currentUser || currentUser.isAuthenticated === null) {
      return;
    }
    if (!currentUser.isAuthenticated && !anonymousRoutes[location.pathname]) {
      navigate(RoutePaths.Global.Login);
    }

    if (
      currentUser.isAuthenticated &&
      !location.pathname.startsWith(RoutePaths.Authenticated.Home)
    ) {
      navigate(RoutePaths.Authenticated.Home);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, navigate]);

  return currentUser && currentUser.isAuthenticated !== null ? (
    <FullPageWrapper>
      {location.pathname.startsWith(RoutePaths.Authenticated.Home) ? (
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <LogoLabelWrapper className="demo-logo-vertical">
              <AppLogo collapsed={collapsed} />
            </LogoLabelWrapper>
            <ApplicationMenu />
          </Sider>
          <Layout>
            <LayoutHeader
              isCollapsedSideBar={collapsed}
              toggleCollapseSideBar={setCollapsed}
            />
            <StyledContent $inputHeight={fullHeight - 113}>
              <Routes>
                {RouteService.getAllRoutesDefinitions(
                  currentUser.isAuthenticated
                )}
              </Routes>
            </StyledContent>
          </Layout>
        </Layout>
      ) : (
        allRoutes[location.pathname]?.component
      )}
    </FullPageWrapper>
  ) : null;
}

const StyledContent = styled(Content)<{ $inputHeight: number }>`
  margin: 24px 16px;
  padding: 24;
  min-height: ${(props) => props.$inputHeight + "px"};
  background: colorBgContainer;
`;

const LogoLabelWrapper = styled.div`
  text-align: center;
`;

const FullPageWrapper = styled.div`
  height: 100%;
`;

export default App;
