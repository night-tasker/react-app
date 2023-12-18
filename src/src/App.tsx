import React, { useEffect, useState } from "react";
import "./App.css";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import styled from "styled-components";
import { Routes, useLocation, useNavigate } from "react-router-dom";
import ApplicationMenu from "./routing/application-menu";
import useCurrentUser from "./store/user/current-user";
import {
  anonymousRoutes,
  allRoutes,
  authenticatedRoutes,
} from "./routing/routes";
import { RoutePaths } from "./routing/route-paths";
import routeService from "./routing/route-service";
import LayoutHeader from "./components/layout/header";
import { updateToken } from "./store/user/token";

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

    if (
      !currentUser.isAuthenticated &&
      authenticatedRoutes[location.pathname] &&
      navigate
    ) {
      navigate(RoutePaths.Global.Login);
    }

    if (currentUser.isAuthenticated && anonymousRoutes[location.pathname]) {
      navigate(RoutePaths.Authenticated.Home);
    }

    if (!allRoutes[location.pathname]) {
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
              <LogoLabel>{collapsed ? "NT" : "NightTasker"}</LogoLabel>
            </LogoLabelWrapper>
            <ApplicationMenu />
          </Sider>
          <Layout>
            <LayoutHeader
              isCollapsedSideBar={collapsed}
              toggleCollapseSideBar={setCollapsed}
            />
            <StyledContent $inputHeight={fullHeight - 113}>
              <Routes>{routeService.getAllRoutesDefinitions()}</Routes>
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

const LogoLabel = styled.h2`
  color: white;
  font-size: 24px;
  padding: 0;
  margin: 15px 0;
`;

const LogoLabelWrapper = styled.div`
  text-align: center;
`;

const FullPageWrapper = styled.div`
  height: 100%;
`;

export default App;
