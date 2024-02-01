import { Button, Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { SideBar } from "../components/SideBar.tsx";
import { ProductList } from "./products/ProductList.tsx";
import { TopMenuBar } from "../components/TopMenuBar.tsx";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Dashboard } from "./Dashboard.tsx";
import { EditProduct } from "./products/EditProduct.tsx";
import { AddProduct } from "./products/AddProduct.tsx";
import { ProductAnalyze } from "./products/ProductAnalyze.tsx";
import { SupplierList } from "./suppliers/SupplierList.tsx";
import { EditSupplier } from "./suppliers/EditSupplier.tsx";
import { AddSupplier } from "./suppliers/AddSupplier.tsx";
import { ComingSoon } from "./ComingSoon.tsx";

export function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    if (localStorage.getItem("is_login") != "true") {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Layout style={{ backgroundColor: "transparent" }}>
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
            <Button
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            >
              <GiHamburgerMenu />
            </Button>
            <TopMenuBar />
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </Header>
        <Layout style={{ backgroundColor: "transparent" }}>
          <Sider
            style={{
              backgroundColor: "white",
            }}
            collapsed={collapsed}
          >
            <SideBar />
          </Sider>
          <Content>
            <Routes>
              <Route path={"/"} Component={Dashboard}></Route>
              <Route path={"/coming"} Component={ComingSoon}></Route>
              <Route path={"/dashboard"} Component={Dashboard}></Route>
              <Route path={"/products"} Component={ProductList}></Route>
              <Route path={"/products/:pk"} Component={EditProduct}></Route>
              <Route path={"/products/add"} Component={AddProduct}></Route>
              <Route
                path={"/products/analyze"}
                Component={ProductAnalyze}
              ></Route>
              <Route path={"/suppliers"} Component={SupplierList}></Route>
              <Route path={"/suppliers/:pk"} Component={EditSupplier}></Route>
              <Route path={"/suppliers/add"} Component={AddSupplier}></Route>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
