import {Button, Layout} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {Route, Routes} from "react-router-dom";
import {NewsList} from "./news/NewsList.tsx";
import Sider from "antd/es/layout/Sider";
import {NewsSideBar} from "../components/NewsSideBar.tsx";
import {NewsDetail} from "./news/NewsDetail.tsx";
import {NewsAdd} from "./news/NewsAdd.tsx";
import {useState} from "react";
import {MdTableRows} from "react-icons/md";
import {TopMenuBar} from "../components/TopMenuBar.tsx";
import {Fade} from "@material-ui/core";

export function NewsHouse() {
    const [collapsed, setCollapsed] = useState(false);
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
            <Fade in={true} timeout={500}>
                <Layout style={{backgroundColor: "white"}}>
                    <Sider style={{backgroundColor: "transparent"}} collapsed={collapsed}
                    >
                        <Button onClick={() => {
                            setCollapsed(!collapsed)
                        }}
                                style={{
                                    width: "100%"
                                }}><MdTableRows/>
                        </Button>
                        <NewsSideBar/>
                    </Sider>
                    <Content>
                        <Routes>
                            <Route path={"/"} Component={NewsList}></Route>
                            <Route path={"/:id/"} Component={NewsDetail}></Route>
                            <Route path={"/add/"} Component={NewsAdd}></Route>
                        </Routes>
                    </Content>
                </Layout>
            </Fade>
        </>
    );
}