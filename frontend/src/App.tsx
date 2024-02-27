import "bootstrap/dist/css/bootstrap.css";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import {Login} from "./pages/Login.tsx";
import './App.css';
import {WorkSpace} from "./pages/WorkSpace.tsx";
import {Welcome} from "./pages/Welcome.tsx";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/workspace/*" element={<WorkSpace/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/welcome" element={<Welcome/>}/>
                    <Route path="/" element={<Welcome/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
