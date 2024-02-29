import type {MenuProps} from "antd";
import {Menu} from "antd";
import {HiTemplate} from "react-icons/hi";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";

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
    getItem("News", "sub1", <HiTemplate/>, [
        getItem("News List", "/workspace/news"),
        getItem("News Add", "/workspace/news/add"),
    ]),

];
const openKeys = location.pathname.split("/")[2];

export const NewsSideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [current, setCurrent] = useState("");

    const onClick: MenuProps["onClick"] = (e) => {
        navigate(e.key);
    };

    useEffect(() => {
        setCurrent(location.pathname);
    }, [location.pathname]);

    return (
        <>
            <Menu
                onClick={onClick}
                defaultOpenKeys={[openKeys]}
                mode="inline"
                items={items}
                selectedKeys={[current]}
            />
        </>
    );
};
