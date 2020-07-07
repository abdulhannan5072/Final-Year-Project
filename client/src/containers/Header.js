import React from "react";
import { Layout, Avatar, Menu, Breadcrumb } from "antd";
import {
  DashboardTwoTone,
  ProjectTwoTone,
  UserOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer } = Layout;

export default function HeaderH() {
  const { SubMenu } = Menu;
  return (
    <Menu mode="horizontal" defaultSelectedKeys={["setting:1"]}>
      <SubMenu icon={<ProjectTwoTone />} title="Projects">
        <Menu.ItemGroup title="Recents">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup>
          <Menu.Item key="setting:3">View all projects</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <Menu.Item icon={<DashboardTwoTone />} key="2">
        Dashboard
      </Menu.Item>
      <SubMenu icon={<Avatar />}>
        <Menu.ItemGroup title="Recents">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      {/* <Menu.Item key="3">nav 3</Menu.Item> */}
    </Menu>
  );
}
