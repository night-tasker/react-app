import useCurrentUser from "entities/user/model/current-user";
import { styled } from "styled-components";
import { SettingOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import AuthService from "shared/services/auth-service";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "app/routing/route-paths";
import UserMenuImage from "./ui/current-user-image";

const UserMenu = () => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const settingsItems: ItemType[] = [
    {
      key: "current-user-info",
      label: "Профиль",
      onClick: () => {
        navigate(RoutePaths.Authenticated.Profile);
      },
    },
    {
      key: "logout",
      label: "Выход",
      onClick: () => {
        AuthService.logout();
      },
    },
  ];

  return currentUser.isAuthenticated && currentUser.user ? (
    <Wrapper>
      <UserInfoWrapper>
        <div>
          <UserMenuImage />
        </div>
        <div>
          <UserNameHeader>{currentUser.user?.userName}</UserNameHeader>
        </div>
      </UserInfoWrapper>
      <SettingsWrapper>
        <Dropdown menu={{ items: settingsItems }} trigger={["click"]}>
          <Button icon={<SettingOutlined />} style={{ border: "none" }} />
        </Dropdown>
      </SettingsWrapper>
    </Wrapper>
  ) : (
    <></>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const UserNameHeader = styled.h1`
  margin: 0;
  padding: 0;
`;

const SettingsWrapper = styled.div`
  font-size: 20px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export default UserMenu;
