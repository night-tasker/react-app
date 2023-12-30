import RegistrationPage from "pages/registration";
import { RoutePaths } from "./route-paths";
import LoginPage from "pages/login";

export const allRoutes: Record<string, Route> = {
  [RoutePaths.Global.Registration]: {
    path: RoutePaths.Global.Registration,
    key: RoutePaths.Global.Registration,
    component: <RegistrationPage />,
    label: "Регистрация",
  },
  [RoutePaths.Global.Login]: {
    path: RoutePaths.Global.Login,
    key: RoutePaths.Global.Login,
    component: <LoginPage />,
    label: "Вход в систему",
  },
  [RoutePaths.Authenticated.Home]: {
    path: RoutePaths.Authenticated.Home,
    key: RoutePaths.Authenticated.Home,
    component: <>Home</>,
    label: "Основная вкладка",
  },
};

export const anonymousRoutes: Record<string, Route> = {
  [RoutePaths.Global.Registration]: allRoutes[RoutePaths.Global.Registration],
  [RoutePaths.Global.Login]: allRoutes[RoutePaths.Global.Login],
};

export const authenticatedRoutes: Record<string, AuthenticatedRoute> = {
  [RoutePaths.Authenticated.Home]: {
    ...allRoutes[RoutePaths.Authenticated.Home],
  },
};

export type Route = {
  path: string;
  component: React.ReactElement;
  label: string;
  key: string;
};

export type AuthenticatedRoute = Route & {
  icon?: React.ReactElement;
  sideBarTab?: boolean;
};
