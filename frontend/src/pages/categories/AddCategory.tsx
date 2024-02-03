import {Button, Card, Col, Form, Input, message, Row} from "antd";
import {Category} from "../../utils/models.ts";
import axios from "axios";
import {get_headers} from "../../utils/basic.ts";
import {useNavigate} from "react-router-dom";

export const AddCategory = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const handleSubmit = (data: Category) => {
        console.log(data);
        const instance = axios.create();
        instance
            .post("api/categories/", data, {
                headers: get_headers(),
            })
            .then((res) => {
                console.log(res);
            });
        success();
    };
    const success = () => {
        messageApi
            .open({
                type: "success",
                content: "Added successfully",
                duration: 1.5,
            })
            .then(() => {
                navigate("/warehouse/categories");
            });
    };
    return (
        <>
            {contextHolder}
            <Form labelCol={{span: 9}} onFinish={(data) => handleSubmit(data)}>
                <div
                    style={{
                        margin: 20,
                        backgroundColor: "transparent",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Card style={{width: "80%"}}>
                        <Row>
                            <Col span={18}>
                                <Form.Item
                                    name={"name"}
                                    label={"Name"}
                                    rules={[
                                        {required: true, message: "Please enter the name!"},
                                    ]}
                                >
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={18}>
                                <Form.Item name={"description"} label={"Description"}>
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Item>
                                    <Button htmlType={"submit"}>Add</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </Form>
        </>
    );
};
