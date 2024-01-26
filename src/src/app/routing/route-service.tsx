import { Route } from "react-router-dom";
import { allRoutes } from "./routes";
import NotFoundPage from "pages/not-found/ui";

const getRouteDefinitions = () => {
  return Object.entries(allRoutes).map(([key, value]) => {
    const route = value;
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
    ...getRouteDefinitions(),
    <Route element={<NotFoundPage />} path="*" key="default" />,
  ];
};

const RouteService = {
  getRouteDefinitions,
  getAllRoutesDefinitions,
  buildRoute,
};

export default RouteService;
