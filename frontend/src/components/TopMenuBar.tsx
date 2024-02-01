import { Fragment, useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { AiOutlineDashboard } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoInformationCircleOutline } from "react-icons/io5";

const items: MenuProps["items"] = [
  {
    label: "Dashboard",
    key: "dashboard",
    icon: <AiOutlineDashboard />,
  },
  {
    label: "User",
    key: "user",
    icon: <FaRegCircleUser />,
  },
  {
    label: "About",
    key: "about",
    icon: <IoInformationCircleOutline />,
  },
  {
    label: "Others",
    key: "others",
    icon: <AiOutlineDashboard />,
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: "alipay",
  },
];

export function TopMenuBar() {
  const location = useLocation();
  const [current, setCurrent] = useState("mail");
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    navigate(e.key);
  };
  useEffect(() => {
    // 在组件初次渲染时设置 defaultSelectedKeys
    const initialKey = location.pathname.split("/")[1];
    setCurrent(initialKey);
  }, [location.pathname]);

  return (
    <Fragment>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        defaultSelectedKeys={[current]}
      />
    </Fragment>
  );
}
