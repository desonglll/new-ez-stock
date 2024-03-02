import {Menu, MenuProps} from "antd";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";


const keys = location.pathname.split("/");
const openKeys = "/" + keys[1] + "/" + keys[2] + "/" + keys[3]

export function UserSideBar() {
    const navigate = useNavigate()
    const items: MenuProps['items'] = [
        {
            label: "User List",
            key: "/workspace/userhouse/user/list",
        },
        {
            label: "Permission",
            key: "/workspace/userhouse/permission",
            children: [
                {
                    label: "Permission List",
                    key: "/workspace/userhouse/permission/list",
                },
                {
                    label: "Group List",
                    key: "/workspace/userhouse/permission/group/list",
                }
            ]
        }
    ]
    const [current, setCurrent] = useState("");

    const onClick: MenuProps["onClick"] = (e) => {
        console.log(e.key)
        navigate(e.key);
    };
    useEffect(() => {
        setCurrent(location.pathname);
        console.log("openKeys: ", openKeys)
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
}