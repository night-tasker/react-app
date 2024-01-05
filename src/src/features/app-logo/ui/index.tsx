import { RoutePaths } from "app/routing/route-paths";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

interface Props {
  collapsed: boolean;
}

const AppLogo = ({ collapsed }: Props) => {
  return (
    <Link to={RoutePaths.Authenticated.Home}>
      <LogoLabel>{collapsed ? "NT" : "NightTasker"}</LogoLabel>
    </Link>
  );
};

export default AppLogo;

const LogoLabel = styled.h2`
  color: white;
  font-size: 24px;
  padding: 0;
  margin: 15px 0;
`;
