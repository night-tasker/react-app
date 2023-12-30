import useCurrentUser from "entities/user/model/current-user";
import { styled } from "styled-components";
import { SettingOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import AuthService from "shared/services/auth-service";

const CurrentUserMenu = () => {
  const currentUserInfo = useCurrentUser();

  const settingsItems: ItemType[] = [
    {
      key: "logout",
      label: "Выход",
      onClick: () => {
        AuthService.logout();
      },
    },
  ];

  return currentUserInfo.isAuthenticated && currentUserInfo.userInfo ? (
    <Wrapper>
      <div>
        <UserNameHeader>{currentUserInfo.userInfo?.userName}</UserNameHeader>
      </div>
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

export default CurrentUserMenu;
