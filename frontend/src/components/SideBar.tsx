import type { MenuProps } from "antd";
import { Menu } from "antd";
import { HiTemplate } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaPersonHiking } from "react-icons/fa6";

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
  getItem("Products", "sub1", <HiTemplate />, [
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
      [
        getItem("Product List", "products"),
        getItem("Add Product", "products/add"),
      ],
      "group",
    ),
  ]),
  { type: "divider" },
  getItem("Suppliers", "sub2", <FaPersonHiking />, [
    getItem(
      "Operations",
      "g2",
      null,
      [
        getItem("Supplier List", "suppliers"),
        getItem("Add Supplier", "suppliers/add"),
      ],
      "group",
    ),
  ]),
];

export const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState("");
  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
    console.log(location.pathname.slice(1));
  };
  useEffect(() => {
    setCurrent(location.pathname.slice(1));
  }, [location.pathname]);
  return (
    <Menu
      onClick={onClick}
      defaultOpenKeys={["sub1", "sub2"]}
      mode="inline"
      items={items}
      selectedKeys={[current]}
    />
  );
};
