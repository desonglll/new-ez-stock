import {Layout} from "antd";
import {Header} from "antd/es/layout/layout";
import {TopMenuBar} from "../components/TopMenuBar.tsx";

export function User() {
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
            UserPage
        </>
    );
}