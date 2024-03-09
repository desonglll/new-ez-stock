import {Route, Routes} from "react-router-dom";
import {ProductAnalyze} from "../pages/products/ProductAnalyze.tsx";
import {ComingSoon} from "../pages/ComingSoon.tsx";
import {Dashboard} from "../pages/Dashboard.tsx";
import {ProductList} from "../pages/products/ProductList.tsx";
import {AttrList} from "../pages/products/AttrList.tsx";
import {AttrEdit} from "../pages/products/AttrEdit.tsx";
import {SupplierList} from "../pages/suppliers/SupplierList.tsx";
import {SupplierEdit} from "../pages/suppliers/SupplierEdit.tsx";
import {SupplierAdd} from "../pages/suppliers/SupplierAdd.tsx";
import {CategoryList} from "../pages/categories/CategoryList.tsx";
import {CategoryEdit} from "../pages/categories/CategoryEdit.tsx";
import {CategoryAdd} from "../pages/categories/CategoryAdd.tsx";
import {CategoryParentList} from "../pages/categories/CategoryParentList.tsx";
import {CategorySubList} from "../pages/categories/CategorySubList.tsx";

export function WareHouseRoutes() {
    return (
        <>
            <Routes>
                <Route path={"/"} Component={ProductAnalyze}></Route>
                <Route path={"/coming"} Component={ComingSoon}></Route>
                <Route path={"/dashboard"} Component={Dashboard}></Route>
                <Route path={"/products/list"} Component={ProductList}></Route>
                <Route path={"/products/analyze"} Component={ProductAnalyze}></Route>
                <Route path={"/products/products-attr"} Component={AttrList}></Route>
                <Route path={"/products/products-attr/:pk"} Component={AttrEdit}></Route>
                {/*<Route path={"/products/products-attr/add"} Component={AttrAdd}></Route>*/}
                <Route path={"/suppliers"} Component={SupplierList}></Route>
                <Route path={"/suppliers/:pk"} Component={SupplierEdit}></Route>
                <Route path={"/suppliers/add"} Component={SupplierAdd}></Route>
                <Route path={"/categories"} Component={CategoryList}></Route>
                <Route path={"/categories/:pk"} Component={CategoryEdit}></Route>
                <Route path={"/categories/add"} Component={CategoryAdd}></Route>
                <Route path={"/categories/parents"} Component={CategoryParentList}></Route>
                <Route path={"/categories/sub"} Component={CategorySubList}></Route>
            </Routes>

        </>
    );
}