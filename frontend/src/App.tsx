import "bootstrap/dist/css/bootstrap.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import { Login } from "./pages/Login.tsx";
import { SignUp } from "./pages/SignUp.tsx";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path={"*"} Component={Home}></Route>

          <Route path={"/login"} Component={Login}></Route>
          <Route path={"/signup"} Component={SignUp}></Route>
        </Routes>
      </>
    </Router>
  );
}

export default App;
