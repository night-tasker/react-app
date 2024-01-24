import { Route } from "react-router-dom";
import { allRoutes } from "./routes";
import NotFoundPage from "pages/not-found/ui";

const getGlobalRouteDefinitions = () => {
  return Object.keys(allRoutes).map((x) => {
    const route = allRoutes[x];
    return (
      <Route element={route.component} path={route.path} key={route.key} />
    );
  });
};

const getRouteDefinitions = () => {
  return Object.keys(allRoutes).map((x) => {
    const route = allRoutes[x];
    return (
      <Route element={route.component} path={route.path} key={route.key} />
    );
  });
};

const buildRoute = (path: string, params: Record<string, string>) => {
  let resultPath = path;

  Object.keys(params).forEach((key) => {
    resultPath = resultPath.replace(`:${key}`, params[key]);
  });

  return resultPath;
};

const getAllRoutesDefinitions = (isUserAuthenticated: boolean) => {
  return [
    ...getGlobalRouteDefinitions(),
    ...getRouteDefinitions(),
    <Route element={<NotFoundPage />} path="*" />,
  ];
};

const RouteService = {
  getGlobalRouteDefinitions,
  getRouteDefinitions,
  getAllRoutesDefinitions,
  buildRoute,
};

export default RouteService;
