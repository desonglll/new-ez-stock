import {Button, Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content,} from "antd/es/layout/layout";
import {ProductSideBar} from "../components/ProductSideBar.tsx";
import {ProductList} from "./products/ProductList.tsx";
import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Dashboard} from "./Dashboard.tsx";
import {EditProduct} from "./products/EditProduct.tsx";
import {AddProduct} from "./products/AddProduct.tsx";
import {ProductAnalyze} from "./products/ProductAnalyze.tsx";
import {SupplierList} from "./suppliers/SupplierList.tsx";
import {EditSupplier} from "./suppliers/EditSupplier.tsx";
import {AddSupplier} from "./suppliers/AddSupplier.tsx";
import {ComingSoon} from "./ComingSoon.tsx";
import {CategoryList} from "./categories/CategoryList.tsx";
import {EditCategory} from "./categories/EditCategory.tsx";
import {AddCategory} from "./categories/AddCategory.tsx";
import {AttrList} from "./products/AttrList.tsx";
import {EditAttr} from "./products/EditAttr.tsx";
import {AddAttr} from "./products/AddAttr.tsx";
import {MdTableRows} from "react-icons/md";
import {CategoryParentList} from "./categories/CategoryParentList.tsx";
import {CategorySubList} from "./categories/CategorySubList.tsx";

export function WareHouse() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    // const handleLogout = () => {
    //     localStorage.clear();
    //     navigate("/login");
    // };
    useEffect(() => {
        if (localStorage.getItem("is_login") != "true") {
            navigate("/login");
        }
    }, []);
    return (
        <>
            <Layout style={{backgroundColor: "transparent"}}>
                <Sider
                    style={{
                        backgroundColor: "white",
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <Button onClick={() => {
                        setCollapsed(!collapsed)
                    }}
                            style={{
                                width: "100%"
                            }}><MdTableRows/>
                    </Button>
                    <ProductSideBar/>

                </Sider>
                <Content>
                    <Routes>
                        <Route path={"/"} Component={ProductAnalyze}></Route>
                        <Route path={"/coming"} Component={ComingSoon}></Route>
                        <Route path={"/dashboard"} Component={Dashboard}></Route>
                        <Route path={"/products"} Component={ProductList}></Route>
                        <Route path={"/products/:pk"} Component={EditProduct}></Route>
                        <Route path={"/products/add"} Component={AddProduct}></Route>
                        <Route
                            path={"/products/analyze"}
                            Component={ProductAnalyze}
                        ></Route>
                        <Route path={"/products-attr"} Component={AttrList}></Route>
                        <Route path={"/products-attr/:pk"} Component={EditAttr}></Route>
                        <Route path={"/products-attr/add"} Component={AddAttr}></Route>
                        <Route path={"/suppliers"} Component={SupplierList}></Route>
                        <Route path={"/suppliers/:pk"} Component={EditSupplier}></Route>
                        <Route path={"/suppliers/add"} Component={AddSupplier}></Route>
                        <Route path={"/categories"} Component={CategoryList}></Route>
                        <Route path={"/categories/:pk"} Component={EditCategory}></Route>
                        <Route path={"/categories/add"} Component={AddCategory}></Route>
                        <Route path={"/categories/parents"} Component={CategoryParentList}></Route>
                        <Route path={"/categories/sub"} Component={CategorySubList}></Route>
                    </Routes>
                </Content>
            </Layout>
        </>
    );
}
