import {Button, Card, Form, Input, message} from "antd";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Fade} from "@material-ui/core";

export function SignUp() {
    const [messageApi, contextHolder] = message.useMessage();

    const info = () => {
        messageApi.info("Sign up successfully!");
    };

    const instance = axios.create();
    const navigate = useNavigate();
    const onSignUpFinish = async (val: {
        username: string;
        password: string;
        email: string;
    }) => {
        try {
            const res = await instance.post("api/signup/", {
                username: val.username,
                password: val.password,
                email: val.email,
            });

            console.log(res.data);
            info();
            navigate("/login");
        } catch (error) {
            // 处理错误
            console.error("Error during signup:", error);
        }
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
                    {contextHolder}
                    <Card style={{width: 300}}>
                        <Form onFinish={onSignUpFinish} layout={"vertical"}>
                            <Form.Item name={"username"} label={"UserName"}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name={"email"} label={"Email"}>
                                <Input type={"email"}/>
                            </Form.Item>
                            <Form.Item name={"password"} label={"Password"}>
                                <Input type={"password"}/>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType={"submit"} type={"primary"}>
                                    SignUp
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </Fade>
        </>
    );
}
