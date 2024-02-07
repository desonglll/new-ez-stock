import "bootstrap/dist/css/bootstrap.css";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import {WareHouse} from "./pages/WareHouse.tsx";
import {Login} from "./pages/Login.tsx";
import {SignUp} from "./pages/SignUp.tsx";
import {TopMenuBar} from "./components/TopMenuBar.tsx";
import {Header} from "antd/es/layout/layout";
import {Layout} from "antd";
import {Dashboard} from "./pages/Dashboard.tsx";
import {User} from "./pages/User.tsx";
import {About} from "./pages/About.tsx";
import {NewsList} from "./pages/NewsList.tsx";
import {NewsDetail} from "./pages/news/NewsDetail.tsx";


function App() {
    return (
        <Router>
            <>
                <Layout style={{backgroundColor: "transparent"}}>
                    <Header
                        style={{
                            backgroundColor: "white",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >

                            <TopMenuBar/>
                        </div>
                    </Header>
                </Layout>
                <Routes>
                    <Route path={"/"} Component={WareHouse}></Route>
                    <Route path={"/warehouse/*"} Component={WareHouse}></Route>
                    <Route path={"/dashboard/*"} Component={Dashboard}></Route>
                    <Route path={"/news/*"} Component={NewsList}></Route>
                    <Route path={"/news/:id/"} Component={NewsDetail}></Route>
                    <Route path={"/user/*"} Component={User}></Route>
                    <Route path={"/about/*"} Component={About}></Route>
                    <Route path={"/login"} Component={Login}></Route>
                    <Route path={"/signup"} Component={SignUp}></Route>
                </Routes>
            </>
        </Router>
    );
}

export default App;
