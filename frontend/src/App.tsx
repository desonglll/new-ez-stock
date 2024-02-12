import "bootstrap/dist/css/bootstrap.css";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import {WareHouse} from "./pages/WareHouse.tsx";
import {Login} from "./pages/Login.tsx";
import {SignUp} from "./pages/SignUp.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import {User} from "./pages/User.tsx";
import {About} from "./pages/About.tsx";
import {NewsHouse} from "./pages/NewsHouse.tsx";


function App() {
    return (
        <Router>
            <>

                <Routes>
                    <Route path={"*"} Component={WareHouse}></Route>
                    <Route path={"/warehouse/*"} Component={WareHouse}></Route>
                    <Route path={"/dashboard/*"} Component={Dashboard}></Route>
                    <Route path={"/news/*"} Component={NewsHouse}></Route>
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
