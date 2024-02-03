import "bootstrap/dist/css/bootstrap.css";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import {WareHouse} from "./pages/WareHouse.tsx";
import {Login} from "./pages/Login.tsx";
import {SignUp} from "./pages/SignUp.tsx";
import {TopMenuBar} from "./components/TopMenuBar.tsx";
import {Header} from "antd/es/layout/layout";
import {Layout} from "antd";
import {Home} from "./pages/Home.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import {User} from "./pages/User.tsx";
import {About} from "./pages/About.tsx";


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
                    <Route path={"/"} Component={Home}></Route>
                    <Route path={"/warehouse/*"} Component={WareHouse}></Route>
                    <Route path={"/dashboard/*"} Component={Dashboard}></Route>
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
