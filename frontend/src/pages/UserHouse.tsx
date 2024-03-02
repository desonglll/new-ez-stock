import {UserSideBar} from "../components/UserSideBar.tsx";
import {UserList} from "./users/UserList.tsx";
import {Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import {Route, Routes} from "react-router-dom";
import {PermissionList} from "./users/PermissionList.tsx";

export function UserHouse() {
    return (
        <>
            <Layout style={{backgroundColor: "transparent"}}>
                <Sider style={{backgroundColor: "transparent"}}>

                    <UserSideBar/>
                </Sider>

                <Content>
                    <Routes>
                        <Route path={"/user/list"} element={<UserList/>}/>
                        <Route path={"/permission/list"} element={<PermissionList/>}/>
                    </Routes>
                </Content>
            </Layout>
        </>
    );
}