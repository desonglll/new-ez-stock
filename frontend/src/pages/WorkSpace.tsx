// WorkSpace.tsx
import {Layout} from "antd";
import {Header} from "antd/es/layout/layout";
import {TopMenuBar} from "../components/TopMenuBar.tsx";
import {WareHouse} from "./WareHouse.tsx";
import {Welcome} from "./Welcome.tsx";
import {Dashboard} from "./Dashboard.tsx";
import {NewsHouse} from "./NewsHouse.tsx";
import {UserHouse} from "./UserHouse.tsx";
import {SignUp} from "./SignUp.tsx";
import {Route, Routes} from "react-router-dom";

export function WorkSpace() {
    return (
        <>
            <Layout style={{backgroundColor: "transparent"}}>
                <Header style={{backgroundColor: "white"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <TopMenuBar/>
                    </div>
                </Header>
            </Layout>
            <Routes>
                <Route path="*" element={<WareHouse/>}/>
                <Route path="warehouse/*" element={<WareHouse/>}/>
                <Route path="dashboard/*" element={<Dashboard/>}/>
                <Route path="news/*" element={<NewsHouse/>}/>
                <Route path="userhouse/*" element={<UserHouse/>}/>
                <Route path="about/*" element={<Welcome/>}/>
                <Route path="signup" element={<SignUp/>}/>
            </Routes>
        </>
    );
}
