export class RoutePaths {
  public static Global = {
    Registration: "/registration",
    Login: "/login",
  };
  public static Authenticated = {
    Home: "/application",
    Profile: "/application/profile",
    Organizations: "/application/organizations",
    Organization: "/application/organizations/:organizationId",
  };
}
