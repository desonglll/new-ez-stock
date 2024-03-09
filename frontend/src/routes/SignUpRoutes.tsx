import {Route, Routes} from "react-router-dom";
import {SignUpSuccess} from "../pages/result_pages/SignUpSuccess.tsx";
import {SignUp} from "../pages/SignUp.tsx";

export function SignUpRoutes() {
    return (
        <>
            <Routes>
                <Route path={"/*"} element={<SignUp/>}/>
                <Route path={"/success"} element={<SignUpSuccess/>}/>
            </Routes>
        </>
    );
}