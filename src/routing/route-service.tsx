import { Route } from "react-router-dom";
import { allRoutes, authenticatedRoutes } from "./routes";

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

const getAllRoutesDefinitions = () => {
  return [...getGlobalRouteDefinitions(), ...getRouteDefinitions()];
};

const routeService = {
  getGlobalRouteDefinitions,
  getRouteDefinitions,
  getAllRoutesDefinitions,
};

export default routeService;
