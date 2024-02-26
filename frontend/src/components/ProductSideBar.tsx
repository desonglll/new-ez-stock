import type {MenuProps} from "antd";
import {Menu} from "antd";
import {HiTemplate} from "react-icons/hi";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {FaPersonHiking} from "react-icons/fa6";
import {BiCategory} from "react-icons/bi";

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
    getItem("Products", "products", <HiTemplate/>, [
        getItem("Product List", "/warehouse/products/list"),
        getItem("Attributes", "/warehouse/products/products-attr")
    ]),
    getItem("Suppliers", "/warehouse/suppliers", <FaPersonHiking/>),
    getItem("Categories", "categories", <BiCategory/>,
        [
            getItem("Parents", "/warehouse/categories/parents", <BiCategory/>),
            getItem("SubCate", "/warehouse/categories/sub", <BiCategory/>)
        ]
    )
];
const openKeys = location.pathname.split("/")[2];

export const ProductSideBar = () => {
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
