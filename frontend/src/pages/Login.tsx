import {Button, Card, Form, Input} from "antd";
import {fetchToken} from "../utils/token.ts";
import {useNavigate} from "react-router-dom";
import {Fade} from "@material-ui/core";
import "../assets/Login.scss"

export function Login() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onLoginFinish = async (val: {
        username: string;
        password: string;
        email: string;
    }) => {
        fetchToken(val.username, val.password)
            .then((data: {
                refresh: string;
                access: string;
                username: string;
                user_id: number
            }) => {
                console.log("refresh: ", data.refresh);
                console.log("access: ", data.access);
                localStorage.setItem("refresh", data["refresh"]);
                localStorage.setItem("access", data["access"]);
                localStorage.setItem("is_login", "true");
                localStorage.setItem("username", data["username"]);
                localStorage.setItem("user_id", String(data["user_id"]));
            })
            .then(() => {
                navigate("/workspace/warehouse");
            })
            .catch((err) => {
                console.log("err", err);
            });
    };
    const onReset = () => {
        form.resetFields();
    };
    const onFill = () => {
        form.setFieldsValue({username: "mike", password: "070011"});
    };
    return (
        <>
            <Fade in={true} timeout={2000}>
                <div
                    style={{
                        height: "100vh",
                        width: "100vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Card style={{width: 300}}>
                        <Form onFinish={onLoginFinish} layout={"vertical"} form={form}>
                            <Form.Item name={"username"} label={"UserName"}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name={"password"} label={"Password"}>
                                <Input type={"password"}/>
                            </Form.Item>
                            <Form.Item>
                                <div className={"flex-center"}>
                                    <Button className={"login-button"} htmlType={"submit"} type={"primary"}>
                                        Login
                                    </Button>
                                    <Button className={"reset-button"} htmlType="button" onClick={onReset}>
                                        Reset
                                    </Button>
                                </div>
                                <div className={"flex-center"}>
                                    <Button type="link" htmlType="button" onClick={onFill}>
                                        Fill form
                                    </Button>
                                    <Button type="link" htmlType="button" onClick={() => {
                                        navigate("/signup")
                                    }}>
                                        Sign Up
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </Fade>
        </>
    );
}
