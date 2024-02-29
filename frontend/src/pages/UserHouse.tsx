import {UserSideBar} from "../components/UserSideBar.tsx";
import {UserList} from "./users/UserList.tsx";
import {Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import {Route, Routes} from "react-router-dom";

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
                    </Routes>
                </Content>
            </Layout>
        </>
    );
}