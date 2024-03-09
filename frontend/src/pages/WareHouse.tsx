import {Button, Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content,} from "antd/es/layout/layout";
import {ProductSideBar} from "../components/ProductSideBar.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {MdTableRows} from "react-icons/md";
import {Fade, Grow,} from "@material-ui/core";
import {WareHouseRoutes} from "../routes/WareHouseRoutes.tsx";

export function WareHouse() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("is_login") != "true") {
            console.log(isLogin)
            navigate("/login");
        }
        setIsLogin(!isLogin)
    }, []);
    return (
        <>
            {!isLogin ? (<div></div>) : (
                <div>
                    <Fade in={true} timeout={500}>
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
                            <Grow in={true} style={{transformOrigin: '0 0 0'}}
                                  {...({timeout: 1000})}>
                                <Content>
                                    <WareHouseRoutes/>
                                </Content>
                            </Grow>
                        </Layout>
                    </Fade>
                </div>
            )}

        </>
    );
}
