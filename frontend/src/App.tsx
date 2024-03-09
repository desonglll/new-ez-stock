import "bootstrap/dist/css/bootstrap.css";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import {Login} from "./pages/Login.tsx";
import './App.css';
import {WorkSpace} from "./routes/WorkSpace.tsx";
import {Welcome} from "./pages/Welcome.tsx";
import {About} from "./pages/About.tsx";
import {Notfound} from "./pages/result_pages/Notfound.tsx";
import {SignUpRoutes} from "./routes/SignUpRoutes.tsx";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="*" element={<Notfound/>}/>
                    <Route path="/workspace/*" element={<WorkSpace/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup/*" element={<SignUpRoutes/>}/>
                    <Route path="/welcome" element={<Welcome/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/" element={<Welcome/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
