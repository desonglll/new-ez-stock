import type { MenuProps } from "antd";
import { Menu } from "antd";
import { HiOutlineHome } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import React from "react";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Products", "sub1", <HiOutlineHome />, [
    getItem(
      "Data",
      "g2",
      null,
      [
        getItem("Analyze", "products/analyze"),
        getItem("Coming soon", "coming"),
      ],
      "group",
    ),
    getItem(
      "Operations",
      "g1",
      null,
      [getItem("List", "products"), getItem("Add", "products/add")],
      "group",
    ),
  ]),
  { type: "divider" },
];

export const SideBar = () => {
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    navigate(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};
