import {Button, Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content, Header,} from "antd/es/layout/layout";
import {ProductSideBar} from "../components/ProductSideBar.tsx";
import {ProductList} from "./products/ProductList.tsx";
import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Dashboard} from "./Dashboard.tsx";
import {ProductAnalyze} from "./products/ProductAnalyze.tsx";
import {SupplierList} from "./suppliers/SupplierList.tsx";
import {SupplierEdit} from "./suppliers/SupplierEdit.tsx";
import {SupplierAdd} from "./suppliers/SupplierAdd.tsx";
import {ComingSoon} from "./ComingSoon.tsx";
import {CategoryList} from "./categories/CategoryList.tsx";
import {CategoryEdit} from "./categories/CategoryEdit.tsx";
import {CategoryAdd} from "./categories/CategoryAdd.tsx";
import {AttrList} from "./products/AttrList.tsx";
import {AttrEdit} from "./products/AttrEdit.tsx";
import {AttrAdd} from "./products/AttrAdd.tsx";
import {MdTableRows} from "react-icons/md";
import {CategoryParentList} from "./categories/CategoryParentList.tsx";
import {CategorySubList} from "./categories/CategorySubList.tsx";
import {TopMenuBar} from "../components/TopMenuBar.tsx";

export function WareHouse() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("is_login") != "true") {
            navigate("/login");
        }
    }, []);
    return (
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
            <Layout style={{backgroundColor: "transparent"}}>
                <Sider
                    style={{
                        backgroundColor: "white",
                        display: "flex",
                        flexDirection: "column"
                    }}
                    collapsed={collapsed}
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
                        <Route
                            path={"/products/analyze"}
                            Component={ProductAnalyze}
                        ></Route>
                        <Route path={"/products-attr"} Component={AttrList}></Route>
                        <Route path={"/products-attr/:pk"} Component={AttrEdit}></Route>
                        <Route path={"/products-attr/add"} Component={AttrAdd}></Route>
                        <Route path={"/suppliers"} Component={SupplierList}></Route>
                        <Route path={"/suppliers/:pk"} Component={SupplierEdit}></Route>
                        <Route path={"/suppliers/add"} Component={SupplierAdd}></Route>
                        <Route path={"/categories"} Component={CategoryList}></Route>
                        <Route path={"/categories/:pk"} Component={CategoryEdit}></Route>
                        <Route path={"/categories/add"} Component={CategoryAdd}></Route>
                        <Route path={"/categories/parents"} Component={CategoryParentList}></Route>
                        <Route path={"/categories/sub"} Component={CategorySubList}></Route>
                    </Routes>
                </Content>
            </Layout>
        </>
    );
}
