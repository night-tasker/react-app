import { theme } from "antd";
import { Header } from "antd/es/layout/layout";
import SideBarToggleButton from "features/sidebar-toggle-button";

interface Props {
  isCollapsedSideBar: boolean;
  toggleCollapseSideBar: (isCollapsed: boolean) => void;
}

const LayoutHeader = ({ isCollapsedSideBar, toggleCollapseSideBar }: Props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <SideBarToggleButton
        isCollapsedSideBar={isCollapsedSideBar}
        toggleCollapseSideBar={toggleCollapseSideBar}
      />
    </Header>
  );
};

export default LayoutHeader;
