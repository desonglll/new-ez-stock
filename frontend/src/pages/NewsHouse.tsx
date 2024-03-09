import {Button, Layout} from "antd";
import {Content,} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {NewsSideBar} from "../components/NewsSideBar.tsx";
import {useState} from "react";
import {MdTableRows} from "react-icons/md";
import {Fade, Grow} from "@material-ui/core";
import {NewsHouseRoutes} from "../routes/NewsHouseRoutes.tsx";

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
                            <NewsHouseRoutes/>
                        </Content>
                    </Layout>
                </Fade>
            </Grow>
        </>
    );
}