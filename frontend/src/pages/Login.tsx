import {Button, Card, Form, Input} from "antd";
import {fetchToken} from "../utils/token.ts";
import {useNavigate} from "react-router-dom";

export function Login() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onLoginFinish = async (val: {
        username: string;
        password: string;
        email: string;
    }) => {
        fetchToken(val.username, val.password)
            .then((data: { refresh: string; access: string }) => {
                console.log("refresh: ", data.refresh);
                console.log("access: ", data.access);
                localStorage.setItem("refresh", data["refresh"]);
                localStorage.setItem("access", data["access"]);
                localStorage.setItem("is_login", "true");
            })
            .then(() => {
                navigate("/warehouse");
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
                            <Button htmlType={"submit"} type={"primary"}>
                                Login
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                            <Button type="link" htmlType="button" onClick={onFill}>
                                Fill form
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    );
}
