import {Button, Card, Col, Form, Input, message, Row} from "antd";
import {ProductAttribute} from "../utils/models.ts";
import axios from "axios";
import {get_headers} from "../utils/basic.ts";
import {useNavigate} from "react-router-dom";
import React from "react";

interface AttrAddProps {
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fetchData: () => void
}

export const AttrAdd: React.FC<AttrAddProps> = ({drawerOpen, setDrawerOpen, fetchData}) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const handleSubmit = (data: ProductAttribute) => {
        console.log(data);
        const instance = axios.create();
        instance
            .post("api/products/product_attributes/", data, {
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
                setDrawerOpen(!drawerOpen);
                fetchData()
                navigate("/workspace/warehouse/products/products-attr");
            }).then(() => {
            form.resetFields()
        });
    };
    return (
        <>
            {contextHolder}
            <Form labelCol={{span: 9}} onFinish={(data) => handleSubmit(data)} form={form}>
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
                                <Form.Item name={"value"} label={"Value"} rules={[
                                    {required: true, message: "Please enter the value!"},
                                ]}>
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
