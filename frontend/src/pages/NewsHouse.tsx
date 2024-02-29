import {Button, Layout} from "antd";
import {Content,} from "antd/es/layout/layout";
import {Route, Routes} from "react-router-dom";
import {NewsList} from "./news/NewsList.tsx";
import Sider from "antd/es/layout/Sider";
import {NewsSideBar} from "../components/NewsSideBar.tsx";
import {NewsDetail} from "./news/NewsDetail.tsx";
import {NewsAdd} from "./news/NewsAdd.tsx";
import {useState} from "react";
import {MdTableRows} from "react-icons/md";
import {Fade, Grow} from "@material-ui/core";

export function NewsHouse() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            <Grow in={true} style={{transformOrigin: '0 0 0'}}
                  {...({timeout: 1000})}>
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
                                <Route path={""} Component={NewsList}></Route>
                                <Route path={":id"} Component={NewsDetail}></Route>
                                <Route path={"add"} Component={NewsAdd}></Route>
                            </Routes>
                        </Content>
                    </Layout>
                </Fade>
            </Grow>
        </>
    );
}