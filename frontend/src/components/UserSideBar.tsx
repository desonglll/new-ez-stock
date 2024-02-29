import {Menu, MenuProps} from "antd";
import {useNavigate} from "react-router-dom";

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
                    key: "/workspace/userhouse/group/list",
                }
            ]
        }
    ]

    const onClick: MenuProps["onClick"] = (e) => {
        navigate(e.key);
    };
    return (
        <>
            <Menu
                onClick={onClick}
                // defaultOpenKeys={[openKeys]}
                mode="inline"
                items={items}
                // selectedKeys={[current]}
            />
        </>
    );
}