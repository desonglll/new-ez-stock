import {Fragment, useEffect, useState} from "react";
import type {MenuProps} from "antd";
import {Button, Menu} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {FaRegCircleUser} from "react-icons/fa6";
import {IoInformationCircleOutline} from "react-icons/io5";
import {LuWarehouse} from "react-icons/lu";
import {FaRegNewspaper} from "react-icons/fa";

const items: MenuProps["items"] = [
    {
        label: "WareHouse",
        key: "/workspace/warehouse",
        icon: <LuWarehouse/>,
    },
    {
        label: "News",
        key: "/workspace/news",
        icon: <FaRegNewspaper/>,
    },
    {
        label: "User",
        key: "/workspace/user",
        icon: <FaRegCircleUser/>,
    },
    {
        label: "About",
        key: "/about",
        icon: <IoInformationCircleOutline/>,
    },
    {
        label: (
            <a href="https://gitee.com/desonglll/new-ez-stock" target="_blank" rel="noopener noreferrer">
                Gitee - Link
            </a>
        ),
        key: "/alipay",
    },
];

export function TopMenuBar() {
    const location = useLocation();
    const [current, setCurrent] = useState("/");
    const navigate = useNavigate();
    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
        navigate(e.key);
    };
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };
    useEffect(() => {
        // 在组件初次渲染时设置 defaultSelectedKeys
        const initialKey = location.pathname.split("/")[2]
        if (initialKey != "") {
            setCurrent("/workspace/" + initialKey);
        }
    }, [location.pathname]);

    return (
        <Fragment>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
                defaultSelectedKeys={[current]}
                style={{width: "100%"}}
            />
            <Button onClick={() => handleLogout()}>Logout</Button>
        </Fragment>
    );
}
