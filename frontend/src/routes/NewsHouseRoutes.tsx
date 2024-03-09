import {Route, Routes} from "react-router-dom";
import {NewsList} from "../pages/news/NewsList.tsx";
import {NewsDetail} from "../pages/news/NewsDetail.tsx";
import {NewsAdd} from "../pages/news/NewsAdd.tsx";

export function NewsHouseRoutes() {
    return (
        <>
            <Routes>
                <Route path={""} Component={NewsList}></Route>
                <Route path={":id"} Component={NewsDetail}></Route>
                <Route path={"add"} Component={NewsAdd}></Route>
            </Routes>
        </>
    );
}