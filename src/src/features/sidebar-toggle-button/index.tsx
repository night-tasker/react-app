import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { styled } from "styled-components";
import UserMenu from "../user-menu";
interface Props {
  isCollapsedSideBar: boolean;
  toggleCollapseSideBar: (isCollapsed: boolean) => void;
}

const SideBarToggleButton = ({
  isCollapsedSideBar,
  toggleCollapseSideBar,
}: Props) => {
  return (
    <Wrapper>
      <SideBareCollapseButtonWrapper>
        <Button
          type="text"
          icon={
            isCollapsedSideBar ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
          }
          onClick={() => toggleCollapseSideBar(!isCollapsedSideBar)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </SideBareCollapseButtonWrapper>
      <UserInfoWrapper>
        <UserMenu />
      </UserInfoWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-content: space-between;
`;

const SideBareCollapseButtonWrapper = styled.div`
  width: 100%;
`;

const UserInfoWrapper = styled.div`
  margin-right: 2%;
`;

export default SideBarToggleButton;
