import {Layout} from "antd";
import {Header} from "antd/es/layout/layout";
import {TopMenuBar} from "../components/TopMenuBar.tsx";
import {WareHouse} from "../pages/WareHouse.tsx";
import {Welcome} from "../pages/Welcome.tsx";
import {Dashboard} from "../pages/Dashboard.tsx";
import {NewsHouse} from "../pages/NewsHouse.tsx";
import {UserHouse} from "../pages/UserHouse.tsx";
import {SignUp} from "../pages/SignUp.tsx";
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
